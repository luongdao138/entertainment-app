import { Response } from 'express';
import prisma from '../config/prisma';
import _ from 'lodash';

const playlistController = {
  // tạo một playlist mới
  async createNewPlaylist(req: any, res: Response) {
    try {
      const { title, is_public, play_random } = req.body;
      const user = req.user;

      if (!title) {
        return res
          .status(400)
          .json({ msg: 'Tên của playlist không được để trống' });
      }

      let new_playlist: any = await prisma.playlist.create({
        data: {
          title,
          creator_id: user.id,
          play_random,
          privacy: Boolean(is_public) ? 'public' : 'private',
          public_at: Boolean(is_public) ? new Date() : null,
        },
        include: {
          creator: {
            select: {
              full_name: true,
              id: true,
            },
          },
        },
      });

      new_playlist.can_edit = true;
      new_playlist.can_delete = true;
      new_playlist.is_owner = true;
      new_playlist.is_liked = false;
      new_playlist.has_songs = [];

      return res.status(201).json({
        msg: 'Tạo playlist mới thành công',
        play_list: new_playlist,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },

  // lấy danh sách playlist của một user
  async getUserPrivatePlaylist(req: any, res: Response) {
    try {
      const user = req.user;

      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 5;
      const is_own = req.query.is_own === 'true' ? true : false;

      let playlists: any[] = [];

      if (is_own) {
        if (req.query.page && req.query.limit) {
          playlists = await prisma.playlist.findMany({
            where: {
              creator_id: user.id,
              is_deleted: false,
            },
            include: {
              creator: {
                select: {
                  full_name: true,
                  id: true,
                },
              },
              has_songs: {
                orderBy: {
                  position: 'asc',
                },
                select: {
                  song: {
                    select: {
                      thumbnail: true,
                    },
                  },
                },
                where: {
                  song: {
                    is_deleted: false,
                  },
                },
                take: 4,
              },
            },
            orderBy: {
              created_at: 'desc',
            },
            take: limit,
            skip: (page - 1) * limit,
          });
        } else {
          playlists = await prisma.playlist.findMany({
            where: {
              creator_id: user.id,
              is_deleted: false,
            },
            include: {
              creator: {
                select: {
                  full_name: true,
                  id: true,
                },
              },
              has_songs: {
                orderBy: {
                  position: 'asc',
                },
                select: {
                  song: {
                    select: {
                      thumbnail: true,
                    },
                  },
                },
                where: {
                  song: {
                    is_deleted: false,
                  },
                },
                take: 4,
              },
            },
            orderBy: {
              created_at: 'desc',
            },
          });
        }
      } else {
        playlists = await prisma.playlist.findMany({
          where: {
            OR: [
              {
                creator_id: user.id,
              },
              {
                liked_by: {
                  some: {
                    user_id: user.id,
                  },
                },
              },
            ],
            is_deleted: false,
          },
          include: {
            creator: {
              select: {
                full_name: true,
                id: true,
              },
            },
            has_songs: {
              orderBy: {
                position: 'asc',
              },
              select: {
                song: {
                  select: {
                    thumbnail: true,
                  },
                },
              },
              where: {
                OR: [
                  {
                    song: {
                      is_deleted: false,
                      privacy: 'public',
                    },
                    playlist: {
                      creator_id: {
                        not: user.id,
                      },
                    },
                  },
                  {
                    playlist: {
                      creator_id: user.id,
                    },
                    song: {
                      is_deleted: false,
                    },
                  },
                ],
              },
              take: 4,
            },
            liked_by: {
              where: {
                user_id: user.id,
              },
              select: {
                created_at: true,
              },
            },
          },
        });

        playlists.sort((a, b) => {
          let y =
            b.creator_id === user.id ? b.created_at : b.liked_by[0].created_at;
          let x =
            a.creator_id === user.id ? a.created_at : a.liked_by[0].created_at;
          return y > x ? 1 : -1;
        });

        if (req.query.page && req.query.limit) {
          playlists = playlists.slice((page - 1) * limit, page * limit);
        }
      }

      playlists = playlists.map((p) => ({
        ...p,
        is_owner: p.creator_id === user.id,
        can_edit: p.creator_id === user.id,
        can_delete: p.creator_id === user.id,
        is_liked: p.liked_by?.length > 0,
      }));

      return res.json({ playlists });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },

  // chỉnh sửa playlist
  async editPlaylist(req: any, res: Response) {
    try {
      const { title, is_public, play_random } = req.body;
      const user = req.user;

      const { play_list_id } = req.params;

      if (!title) {
        return res
          .status(400)
          .json({ msg: 'Tên của playlist không được để trống' });
      }

      const play_list = await prisma.playlist.findFirst({
        where: { id: play_list_id, is_deleted: false },
      });

      if (!play_list || play_list.is_deleted) {
        return res.status(404).json({ msg: 'Playlist không tồn tại' });
      }

      if (play_list.creator_id !== user.id) {
        return res
          .status(400)
          .json({ msg: 'Không có quyền chỉnh sửa playlist này' });
      }

      await prisma.playlist.update({
        where: {
          id: play_list_id,
        },
        data: {
          title,
          play_random,
          privacy: Boolean(is_public) ? 'public' : 'private',
          public_at: Boolean(is_public) ? new Date() : null,
        },
      });

      return res.json({ msg: 'Chỉnh sửa playlist thành công' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },

  // xóa playlist
  async deletePlaylist(req: any, res: Response) {
    try {
      const user = req.user;
      const { play_list_id } = req.params;

      const play_list = await prisma.playlist.findFirst({
        where: { id: play_list_id, is_deleted: false },
      });

      if (!play_list || play_list.is_deleted) {
        return res.status(404).json({ msg: 'Playlist không tồn tại' });
      }

      if (play_list.creator_id !== user.id) {
        return res
          .status(400)
          .json({ msg: 'Không có quyền chỉnh sửa playlist này' });
      }

      await prisma.playlist.update({
        where: {
          id: play_list_id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return res.json({ msg: 'Xóa playlist thành công' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },

  // thêm hoặc xóa 1 playlist ra khỏi danh sách yêu thích
  async likeOrUnlikePlaylist(req: any, res: Response) {
    try {
      const user = req.user;

      const { playlist_id } = req.params;
      const playlist = await prisma.playlist.findFirst({
        where: {
          id: playlist_id,
          is_deleted: false,
        },
      });

      if (!playlist) {
        return res.status(404).json({ msg: 'Playlist không tồn tại' });
      }

      if (playlist.creator_id == user.id) {
        return res.status(400).json({ msg: 'User là người tạo ra playlist' });
      }

      // kiểm tra xem nếu user này ko phải là creator, playlist là private => ko cho lấy thông tin
      if (playlist.privacy === 'private' && playlist.creator_id !== user.id)
        return res.status(404).json({ msg: 'Playlist không tồn tại' });

      const favourite_playlists = await prisma.favouritePlaylist.findMany({
        where: {
          playlist_id,
        },
        select: {
          user_id: true,
        },
      });

      const is_liked = favourite_playlists.some((fp) => fp.user_id === user.id);

      if (!is_liked) {
        await prisma.favouritePlaylist.create({
          data: { playlist_id, user_id: user.id },
        });

        return res.json({ msg: 'Đã thêm playlist vào thư viện' });
      } else {
        await prisma.favouritePlaylist.delete({
          where: {
            user_id_playlist_id: {
              playlist_id,
              user_id: user.id,
            },
          },
        });

        return res.json({ msg: 'Đã xóa playlist khỏi thư viện' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },

  // thêm một bài hát vào một playlist
  async addSongToPlaylist(req: any, res: Response) {
    try {
      const user = req.user;
      const { playlist_id, song_id } = req.body;

      // kiểm tra xem playlist này có tồn tại hay không
      const playlist = await prisma.playlist.findFirst({
        where: { id: playlist_id, is_deleted: false },
      });
      if (!playlist)
        return res.status(404).json({ msg: 'Playlist không tồn tại' });

      // kiểu tra nếu user này ko phải là creator của playlist => không có thêm
      if (playlist.creator_id !== user.id)
        return res
          .status(400)
          .json({ msg: 'Không có quyền thêm bài hát vào playlist này' });

      // kiểm tra xem bài hát này có tồn tại hay không
      const song = await prisma.song.findFirst({
        where: { id: song_id, is_deleted: false },
        select: {
          privacy: true,
          user: {
            select: { id: true },
          },
        },
      });
      if (!song) return res.status(404).json({ msg: 'Bài hát không tồn tại' });

      // kiểm tra xem nếu bài hát là private và user này ko phải là creator => ko cho thêm
      if (song.privacy === 'private' && song.user.id !== user.id)
        return res.status(404).json({ msg: 'Bài hát không tồn tại' });

      const playlist_song = await prisma.playlistSong.findUnique({
        where: {
          playlist_id_song_id: {
            playlist_id,
            song_id,
          },
        },
      });

      // nếu bài hát đã có sẵn trong playlist => trả về ngay message thành công
      if (playlist_song) {
        return res.json({ msg: 'Thêm bài hát vào playlist thành công' });
      }

      const song_count = await prisma.playlistSong.count({
        where: {
          playlist_id,
        },
      });

      // nếu bài hát chưa có trong playlist, thêm vào playlist và trả về message thành công
      await prisma.playlistSong.create({
        data: {
          playlist_id,
          song_id,
          position: song_count > 0 ? song_count : 0,
        },
      });

      return res
        .status(201)
        .json({ msg: 'Thêm bài hát vào playlist thành công' });
    } catch (error) {
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },

  // xóa một bài hát ra khỏi một playlist
  async deleteSongOutOfPlaylist(req: any, res: Response) {
    try {
      const user = req.user;
      const { playlist_id, song_id } = req.body;

      // kiểm tra xem playlist này có tồn tại hay không
      const playlist = await prisma.playlist.findFirst({
        where: { id: playlist_id, is_deleted: false },
      });
      if (!playlist)
        return res.status(404).json({ msg: 'Playlist không tồn tại' });

      // kiểu tra nếu user này ko phải là creator của playlisr => không có thêm
      if (playlist.creator_id !== user.id)
        return res
          .status(400)
          .json({ msg: 'Không có quyền xóa bài hát khỏi playlist này' });

      // kiểm tra xem bài hát này có tồn tại hay không
      const song = await prisma.song.findFirst({
        where: { id: song_id, is_deleted: false },
      });
      if (!song) return res.status(404).json({ msg: 'Bài hát không tồn tại' });

      const playlist_song = await prisma.playlistSong.findUnique({
        where: {
          playlist_id_song_id: {
            playlist_id,
            song_id,
          },
        },
      });

      // nếu playlist ko có bài hát này
      if (!playlist_song) {
        return res
          .status(400)
          .json({ msg: 'Bài hát chưa được thêm vào playlist này' });
      }

      // tiến hành xóa bài hát ra khỏi playlist
      await prisma.playlistSong.delete({
        where: {
          playlist_id_song_id: {
            playlist_id,
            song_id,
          },
        },
      });

      // tìm những bài hát chưa bị xóa thuộc playlist này và sắp xếp theo thứ tự position tăng dần
      const playlist_songs = await prisma.playlistSong.findMany({
        where: {
          playlist_id,
          song: {
            is_deleted: false,
          },
        },
        orderBy: {
          position: 'asc',
        },
        select: {
          song_id: true,
        },
      });

      // cập nhật lại position của những bài hát thuộc playlist này
      for (const key in playlist_songs) {
        const current_song_id = playlist_songs[key].song_id;
        await prisma.playlistSong.update({
          where: {
            playlist_id_song_id: {
              playlist_id,
              song_id: current_song_id,
            },
          },
          data: {
            position: Number(key),
          },
        });
      }

      return res.json({ msg: 'Xóa bài hát khỏi playlist thành công' });
    } catch (error) {
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },

  // lấy ra danh sách bài hát của 1 playlist
  async getAllSongsOfPlaylist(req: any, res: Response) {
    try {
      const user = req.user;
      const { playlist_id } = req.params;
      console.log({ playlist_id });

      // kiểm tra xem playlist này có tồn tại hay không
      const playlist = await prisma.playlist.findFirst({
        where: { id: playlist_id, is_deleted: false },
      });
      if (!playlist)
        return res.status(404).json({ msg: 'Playlist không tồn tại' });

      // kiểm tra xem nếu user này ko phải là creator, playlist là private => ko cho lấy thông tin
      if (playlist.privacy === 'private' && playlist.creator_id !== user.id)
        return res.status(404).json({ msg: 'Playlist không tồn tại' });

      let playlist_songs: any[] = [];

      playlist_songs = await prisma.playlistSong.findMany({
        where: {
          playlist_id,
          song: {
            is_deleted: false,
            OR: [
              {
                user_id: user.id,
              },
              {
                NOT: { user_id: user.id },
                privacy: 'public',
              },
            ],
          },
        },
        orderBy: {
          position: 'asc',
        },
        select: {
          song: {
            include: {
              belong_categories: {
                select: {
                  id: true,
                },
              },
            },
          },
          position: true,
        },
      });

      // lấy ra những bài hát mà người này yêu thích
      const user_favourite_songs = await prisma.favouriteSong.findMany({
        where: {
          user_id: user.id,
        },
        select: {
          song_id: true,
        },
      });

      const songs = playlist_songs.map((ps) => ({
        ...ps.song,
        position: ps.position,
        is_liked: user_favourite_songs.some((fs) => fs.song_id === ps.song.id),
      }));

      return res.json({ songs });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },

  // thay đổi vị trí của hai bài hát cho nhau trong một playlist
  async changeSongPositionInPlaylist(req: any, res: Response) {
    try {
      const user = req.user;
      const { playlist_id, new_songs } = req.body;

      // kiểm tra xem playlist này có tồn tại hay không
      const playlist = await prisma.playlist.findFirst({
        where: { id: playlist_id, is_deleted: false },
      });
      if (!playlist)
        return res.status(404).json({ msg: 'Playlist không tồn tại' });

      // kiểu tra nếu user này ko phải là creator của playlist => không có chỉnh sửa
      if (playlist.creator_id !== user.id)
        return res
          .status(400)
          .json({ msg: 'Không có quyền xóa bài hát khỏi playlist này' });

      // // tìm ra vị trí hiện tại của hai bài hát trong playlist này
      // const song_positions = await prisma.playlistSong.findMany({
      //   where: {
      //     playlist_id,
      //     song_id: {
      //       in: [source_song_id, destination_song_id],
      //     },
      //   },
      //   select: {
      //     position: true,
      //     song_id: true,
      //   },
      // });

      // const source_song_position = song_positions.find(
      //   (sp) => sp.song_id === source_song_id
      // )?.position;
      // const destination_song_position = song_positions.find(
      //   (sp) => sp.song_id === destination_song_id
      // )?.position;

      // //cập nhật lại vị trí của hai bài hát trong playlist
      // if (source_song_position && destination_song_position) {
      //   await prisma.playlistSong.update({
      //     data: {
      //       position: destination_song_position,
      //     },
      //     where: {
      //       playlist_id_song_id: {
      //         playlist_id,
      //         song_id: source_song_id,
      //       },
      //     },
      //   });

      //   await prisma.playlistSong.update({
      //     data: {
      //       position: source_song_position,
      //     },
      //     where: {
      //       playlist_id_song_id: {
      //         playlist_id,
      //         song_id: destination_song_id,
      //       },
      //     },
      //   });
      // }

      for (const key in new_songs) {
        const new_song = new_songs[key];
        await prisma.playlistSong.update({
          where: {
            playlist_id_song_id: {
              playlist_id,
              song_id: new_song,
            },
          },
          data: {
            position: Number(key),
          },
        });
      }

      return res.json({ msg: 'Cập nhật vị trí thành công' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },

  // lấy thông tin chi tiết của một playlist
  async getPlaylistDetail(req: any, res: Response) {
    const { play_list_id } = req.params;
    const user = req.user;
    try {
      const playlist = await prisma.playlist.findFirst({
        where: { id: play_list_id, is_deleted: false },
        include: {
          creator: {
            select: {
              id: true,
              full_name: true,
            },
          },
        },
      });
      if (!playlist)
        return res.status(404).json({ msg: 'Playlist không tồn tại' });

      // kiểm tra xem nếu user này ko phải là creator, playlist là private => ko cho lấy thông tin
      if (playlist.privacy === 'private' && playlist.creator_id !== user.id)
        return res.status(404).json({ msg: 'Playlist không tồn tại' });

      const favourite_playlist = await prisma.favouritePlaylist.findUnique({
        where: {
          user_id_playlist_id: {
            playlist_id: play_list_id,
            user_id: user.id,
          },
        },
      });

      let data: any = { ...playlist };

      data.is_owner = playlist.creator_id === user.id;
      data.can_edit = playlist.creator_id === user.id;
      data.can_delete = playlist.creator_id === user.id;
      if (!data.is_owner) {
        data.is_liked = Boolean(favourite_playlist);
      }

      return res.json({
        playlist: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },

  // lấy danh sách bài hát gợi ý của playlist
  async getRecommendedSongsOfPlaylist(req: any, res: Response) {
    try {
      const user = req.user;
      const { playlist_id } = req.params;

      const playlist = await prisma.playlist.findFirst({
        where: {
          id: playlist_id,
          is_deleted: false,
        },
      });

      if (!playlist)
        return res.status(404).json({ msg: 'Playlist không tồn tại' });

      // tìm số lượng bài hát hiện tại của playlist
      const playlist_songs = await prisma.playlistSong.findMany({
        where: {
          playlist_id,
          song: {
            is_deleted: false,
            OR: [
              {
                user_id: user.id,
              },
              {
                NOT: { user_id: user.id },
                privacy: 'public',
              },
            ],
          },
        },
        select: {
          song_id: true,
          song: {
            select: {
              belong_categories: {
                select: { id: true },
              },
              user_id: true,
            },
          },
        },
      });

      let songs: any[] = [];

      if (playlist_songs.length === 0) {
        //   hiện tại trong playlist chưa có bài hát nào
        /*
             - Ý định: sẽ lấy các bài hát gợi ý theo tên của playlist 
             - Lấy những bài hát có tên bao gồm tên của playlist 
               hoặc những bài hát có tên người tải lên bao gồm tên của playlist
               hoặc những bài hát có tên ca sĩ bao gồm tên của playlist
             - Những bài hát này phải chưa bị xóa và có chế độ công khai nếu
               người tải bài hát đó ko phải là người đang thực hiện truy vấn
        */

        songs = await prisma.song.findMany({
          where: {
            is_deleted: false,
            privacy: 'public',
            user_id: {
              not: user.id,
            },
            OR: [
              {
                name: {
                  contains: playlist.title,
                  mode: 'insensitive',
                },
              },
              {
                user: {
                  full_name: {
                    contains: playlist.title,
                    mode: 'insensitive',
                  },
                },
              },
              {
                singer_name: {
                  contains: playlist.title,
                  mode: 'insensitive',
                },
              },
            ],
          },
          take: 20,
          // có thể phải bổ sung cách sắp xếp các bài hát
        });
      } else {
        // hiện tại trong playlist đã có bài hát
        /*
            - Ý định: (dù thế nào cũng ko được lấy những bài hát đã có sẵn trong playlist)
            - Lấy những bài hát cùng thể loại với những bài hát đã có trong playlist (những bài này ko đc upload bởi người đang truy vấn)
            - Lấy những bài hát được upload bởi những người đã upload bài hát trong playlist (trừ chính người đang truy vấn) (công khai)
            - Phải chú ý đên việc sắp xếp các bài hát
            - Hiện tại chỉ lấy tối đa 150 bài
        */
        const current_song_ids = playlist_songs.map((ps) => ps.song_id);
        const categories = new Set<string>();
        const users = new Set<string>();

        // tìm ra những categories có trong bài hát và những người đã upload các bài hát này (trừ người đang truy vấn)
        playlist_songs.forEach((ps) => {
          if (ps.song.user_id !== user.id) {
            users.add(ps.song.user_id);
          }
          ps.song.belong_categories.forEach((c) => categories.add(c.id));
        });

        const pl_users = Array.from(users);
        const pl_categories = Array.from(categories);
        console.log({ pl_categories, pl_users, current_song_ids });

        songs = await prisma.song.findMany({
          where: {
            is_deleted: false,
            privacy: 'public',
            id: {
              notIn: current_song_ids,
            },
            user_id: {
              not: user.id,
            },
            OR: [
              {
                belong_categories: {
                  some: {
                    id: {
                      in: pl_categories,
                    },
                  },
                },
              },
              {
                user_id: {
                  in: pl_users,
                },
              },
            ],
          },
          take: 200,
        });
      }

      // shuffle the songs before retrun, currently using built in shuffle function of lodash
      songs = _.shuffle(songs);

      return res.json({ songs });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },
};

export default playlistController;
