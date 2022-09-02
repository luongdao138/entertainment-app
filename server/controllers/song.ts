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
        },
      },
      select: {
        created_at: true,
        song: true,
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
};

export default songController;
