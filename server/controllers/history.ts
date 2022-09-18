import { Response } from 'express';
import prisma from '../config/prisma';

const historyController = {
  async addSongToRecentList(req: any, res: Response) {
    try {
      const user = req.user;
      const { song_id } = req.body;

      const song = await prisma.song.findFirst({
        where: {
          id: song_id,
          is_deleted: false,
        },
      });

      if (!song) {
        return res.status(404).json({
          msg: `Can not find song with id ${song_id}`,
        });
      }

      const is_exist = await prisma.historySong.findUnique({
        where: {
          user_id_song_id: {
            song_id,
            user_id: user.id,
          },
        },
      });

      if (is_exist) {
        // nếu bài hát này đã có trong lịch sử phát của user thì xóa ra rồi thêm lại sau
        await prisma.historySong.delete({
          where: {
            user_id_song_id: {
              song_id,
              user_id: user.id,
            },
          },
        });
      }

      // thêm bài hát vào lịch sử phát của user
      await prisma.historySong.create({
        data: {
          song_id,
          user_id: user.id,
        },
      });

      return res.json({ msg: 'Thêm vào lịch sử phát thành công' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: 'Có lỗi xảy ra',
      });
    }
  },

  // lấy ra danh sách lịch sử phát của user
  async getHistorySongs(req: any, res: Response) {
    try {
      const user = req.user;
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 20;

      const total_count = await prisma.historySong.count({
        where: { user_id: user.id },
      });
      const history_songs = await prisma.historySong.findMany({
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
          user_id: true,
          song: {
            include: {
              belong_categories: {
                select: {
                  id: true,
                },
              },
              lyric: {
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
        take: limit,
        skip: (page - 1) * limit,
      });

      let songs = history_songs.map((hs) => hs.song);
      const user_favourite_songs = await prisma.favouriteSong.findMany({
        where: { user_id: user.id },
        select: { song_id: true },
      });
      songs = songs.map((song) => ({
        ...song,
        is_liked: user_favourite_songs.some((fs) => fs.song_id === song.id),
      }));

      return res.json({
        data: songs,
        pagination: {
          page,
          limit,
          total_count,
        },
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'Có lỗi xảy ra',
      });
    }
  },

  // xóa một bài hát ra khỏi lịch sử phát
  async deleteSongOutOfHistory(req: any, res: Response) {
    try {
      const user = req.user;
      const { song_id } = req.params;
      const is_exist = await prisma.historySong.findUnique({
        where: {
          user_id_song_id: {
            song_id,
            user_id: user.id,
          },
        },
      });
      if (!is_exist)
        return res.json({ msg: 'Xóa bài hát khỏi lịch sử phát thành công' });

      await prisma.historySong.delete({
        where: {
          user_id_song_id: {
            song_id,
            user_id: user.id,
          },
        },
      });

      return res.json({ msg: 'Xóa bài hát khỏi lịch sử phát thành công' });
    } catch (error) {
      return res.status(500).json({
        msg: 'Có lỗi xảy ra',
      });
    }
  },
};

export default historyController;
