import { Request, Response } from 'express';
import prisma from '../config/prisma';

const playlistController = {
  async createNewPlaylist(req: any, res: Response) {
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

    return res
      .status(201)
      .json({ msg: 'Tạo playlist mới thành công', play_list: new_playlist });
  },
  async getUserPrivatePlaylist(req: any, res: Response) {
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
  },
  async editPlaylist(req: any, res: Response) {
    const { title, is_public, play_random } = req.body;
    const user = req.user;

    const { play_list_id } = req.params;

    if (!title) {
      return res
        .status(400)
        .json({ msg: 'Tên của playlist không được để trống' });
    }

    const play_list = await prisma.playlist.findUnique({
      where: { id: play_list_id },
    });

    if (!play_list || play_list.is_deleted) {
      return res.status(400).json({ msg: 'Playlist không tồn tại' });
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
  },
  async deletePlaylist(req: any, res: Response) {
    const user = req.user;
    const { play_list_id } = req.params;

    const play_list = await prisma.playlist.findUnique({
      where: { id: play_list_id },
    });

    if (!play_list || play_list.is_deleted) {
      return res.status(400).json({ msg: 'Playlist không tồn tại' });
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
  },
  async likeOrUnlikePlaylist(req: any, res: Response) {
    const user = req.user;

    const { playlist_id } = req.params;
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: playlist_id,
      },
    });

    if (!playlist) {
      return res.status(400).json({ msg: 'Playlist không tồn tại' });
    }

    if (playlist.creator_id == user.id) {
      return res.status(400).json({ msg: 'User là người tạo ra playlist' });
    }

    const is_liked = await prisma.playlist.findFirst({
      where: {
        id: playlist_id,
        liked_by: {
          some: {
            user_id: user._id,
          },
        },
      },
    });

    if (!is_liked) {
      await prisma.playlist.update({
        where: {
          id: playlist_id,
        },
        data: {
          liked_by: {
            create: {
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
        },
      });

      return res.json({ msg: 'Đã thêm playlist vào thư viện' });
    } else {
      await prisma.playlist.update({
        where: {
          id: playlist_id,
        },
        data: {
          liked_by: {
            delete: {
              user_id_playlist_id: {
                user_id: user.id,
                playlist_id: playlist_id,
              },
            },
          },
        },
      });

      return res.json({ msg: 'Đã xóa playlist khỏi thư viện' });
    }
  },
};

export default playlistController;
