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

    return res
      .status(201)
      .json({ msg: 'Tạo playlist mới thành công', play_list: new_playlist });
  },
  async getUserPrivatePlaylist(req: any, res: Response) {
    const user = req.user;

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 5;

    let playlists = await prisma.playlist.findMany({
      where: { creator_id: user.id, is_deleted: false },
      orderBy: { created_at: 'desc' },
      include: {
        creator: {
          select: {
            full_name: true,
            id: true,
          },
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    playlists = playlists.map((p) => ({
      ...p,
      is_ower: true,
      can_edit: true,
      can_delete: true,
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
};

export default playlistController;
