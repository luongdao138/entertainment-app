import { error } from 'console';
import { Request, Response } from 'express';
import prisma from '../config/prisma';

const songController = {
  async uploadSong(req: any, res: Response) {
    const { duration, name, singer_name, thumbnail, url } = req.body;
    const user = req.user;

    const songCount = await prisma.song.count({
      where: { user_id: user.id, is_deleted: false },
    });
    console.log({ songCount });
    if (songCount >= 20 && !user.is_premium) {
      return res.status(400).json({
        msg: 'Tải lên thất bại, trở thành thành viên premium để tải thêm bài hát',
      });
    }

    const newSong = await prisma.song.create({
      data: {
        name,
        singer_name,
        thumbnail,
        url,
        duration,
        user_id: user.id,
        belong_categories: {
          connect: {
            id: '1d24c45a-0904-4ec4-a4a4-d67edab38013',
          },
        },
      },
    });

    await prisma.favouriteSong.create({
      data: {
        song_id: newSong.id,
        user_id: user.id,
      },
    });

    return res.status(201).json({
      msg: 'Upload song successfully',
      song: newSong,
    });
  },
  async getUploadedSong(req: any, res: Response) {
    const user = req.user;

    let songs = await prisma.song.findMany({
      where: {
        user_id: user.id,
        is_deleted: false,
      },
      include: {
        belong_categories: {
          select: {
            id: true,
          },
        },
      },

      orderBy: {
        created_at: 'desc',
      },
    });

    const user_favourite_songs = await prisma.favouriteSong.findMany({
      where: {
        user_id: user.id,
        song: {
          is_deleted: false,
        },
      },
      select: {
        song_id: true,
      },
    });

    songs = songs.map((song) => {
      const new_song = {
        ...song,
        is_liked: user_favourite_songs.some((fs) => fs.song_id === song.id),
      };
      return new_song;
    });

    return res.json({
      songs,
    });
  },
  async getFavouriteSong(req: any, res: Response) {
    const user = req.user;

    const favourite_songs = await prisma.favouriteSong.findMany({
      where: {
        user_id: user.id,
        song: {
          is_deleted: false,
          OR: [
            {
              user_id: user.id,
            },
            {
              NOT: {
                user_id: user.id,
              },
              privacy: 'public',
            },
          ],
        },
      },
      select: {
        created_at: true,
        song: {
          include: {
            belong_categories: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    let songs = favourite_songs.map((fs) => fs.song);
    songs = songs.map((song) => ({ ...song, is_liked: true }));

    return res.json({ songs });
  },
  async addOrRemoveFavourite(req: any, res: Response) {
    const user = req.user;
    const { songId } = req.params;

    try {
      const song = await prisma.song.findFirst({
        where: {
          id: songId,
          is_deleted: false,
        },
      });

      if (!song) {
        return res.status(400).json({
          msg: `Can not find song with id ${songId}`,
        });
      }

      const favourite_songs = await prisma.favouriteSong.findMany({
        where: {
          song: {
            is_deleted: false,
            id: songId,
          },
        },
        select: {
          user_id: true,
        },
      });

      const is_liked = favourite_songs.some((fs) => fs.user_id === user.id);

      if (is_liked) {
        // user already like this song => remove
        await prisma.favouriteSong.delete({
          where: {
            user_id_song_id: {
              song_id: songId,
              user_id: user.id,
            },
          },
        });

        return res
          .status(200)
          .json({ msg: 'Remove this song out of favourite success' });
      } else {
        // user have not liked this song => add
        await prisma.favouriteSong.create({
          data: {
            song_id: songId,
            user_id: user.id,
          },
        });

        return res
          .status(200)
          .json({ msg: 'Add this song to favourite success' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Có lỗi xảy ra' });
    }
  },

  // edit bài hát
  async editSong(req: any, res: Response) {
    try {
      const { song_id } = req.params;
      const user = req.user;
      const { categories, ...data } = req.body;

      const song = await prisma.song.findFirst({
        where: { id: song_id, is_deleted: false },
        select: {
          user_id: true,
          belong_categories: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!song) return res.status(404).json({ msg: 'Bài hát không tồn tại' });

      if (song.user_id !== user.id)
        return res
          .status(400)
          .json({ msg: 'Không có quyền chỉnh sửa bài hát này' });

      if (categories) {
        // tìm ra những category đc thay đổi
        const old_categories = song?.belong_categories.map((c) => c.id);

        const added_categories = categories.filter(
          (c: string) => !old_categories.includes(c)
        );
        const removed_categories = old_categories.filter(
          (c) => !categories.includes(c)
        );

        for (const id of removed_categories) {
          await prisma.song.update({
            where: {
              id: song_id,
            },
            data: {
              belong_categories: {
                disconnect: {
                  id,
                },
              },
            },
          });
        }

        for (const id of added_categories) {
          await prisma.song.update({
            where: {
              id: song_id,
            },
            data: {
              belong_categories: {
                connect: {
                  id,
                },
              },
            },
          });
        }
      }

      await prisma.song.update({
        where: {
          id: song_id,
        },
        data,
      });

      return res.json({ msg: 'Chỉnh sửa bài hát thành công' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: 'Có lỗi xảy ra',
      });
    }
  },

  // xóa bài hát đã upload
  async deleteSong(req: any, res: Response) {
    try {
      const { song_id } = req.params;
      const user = req.user;

      const song = await prisma.song.findFirst({
        where: { id: song_id, is_deleted: false },
      });

      if (!song) return res.status(404).json({ msg: 'Bài hát không tồn tại' });

      if (song.user_id !== user.id)
        return res
          .status(400)
          .json({ msg: 'Không có quyền chỉnh sửa bài hát này' });

      await prisma.song.update({
        where: {
          id: song_id,
        },
        data: {
          is_deleted: true,
        },
      });

      return res.json({ msg: 'Xóa bài hát thành công' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: 'Có lỗi xảy ra',
      });
    }
  },
};

export default songController;
