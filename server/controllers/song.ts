import { Request, Response } from 'express';
import prisma from '../config/prisma';

const songController = {
  async uploadSong(req: any, res: Response) {
    const { duration, name, singer_name, thumbnail, url } = req.body;
    const user = req.user;

    const newSong = await prisma.song.create({
      data: {
        name,
        singer_name,
        thumbnail,
        url,
        duration,
        user_id: user.id,
        liked_by: {
          connect: {
            id: user.id,
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
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const user_favourite_songs = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        favourite_songs: { select: { id: true } },
      },
    });

    songs = songs.map((song) => {
      const new_song = {
        ...song,
        is_liked: user_favourite_songs?.favourite_songs.some(
          (x) => x.id === song.id
        ),
      };
      return new_song;
    });

    return res.json({
      songs,
    });
  },
  async getFavouriteSong(req: any, res: Response) {
    const user = req.user;

    let songs = await prisma.song.findMany({
      where: {
        liked_by: {
          some: {
            id: user.id,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    songs = songs.map((song) => ({ ...song, is_liked: true }));

    return res.json({ songs });
  },
  async addOrRemoveFavourite(req: any, res: Response) {
    const user = req.user;
    const { songId } = req.params;

    const song = await prisma.song.findUnique({
      where: {
        id: songId,
      },
      select: {
        liked_by: {
          select: {
            id: true,
          },
        },
        id: true,
      },
    });

    if (!song) {
      return res.status(400).json({
        msg: `Can not find song with id ${songId}`,
      });
    }

    const is_liked = song.liked_by.some((x) => x.id === user.id);
    console.log({ is_liked });

    if (is_liked) {
      // user already like this song => remove
      await prisma.song.update({
        where: {
          id: songId,
        },
        data: {
          liked_by: {
            disconnect: {
              id: user.id,
            },
          },
        },
      });

      return res
        .status(200)
        .json({ msg: 'Remove this song out of favourite success' });
    } else {
      // user have not liked this song => add
      await prisma.song.update({
        where: {
          id: songId,
        },
        data: {
          liked_by: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return res
        .status(200)
        .json({ msg: 'Add this song to favourite success' });
    }
  },
};

export default songController;
