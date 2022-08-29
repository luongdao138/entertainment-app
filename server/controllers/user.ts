import { Response } from 'express';
import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';

const userController = {
  async getLoggedInUser(req: any, res: Response) {
    return res.json({ user: req.user });
  },
  async updateProfile(req: any, res: Response) {
    const data = req.body;
    const user = req.user;

    if (data.email) {
      return res.status(400).json({ msg: 'Không được thay đổi email!' });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: data,
    });

    return res.json({
      msg: 'Cập nhật thông tin cá nhân thành công',
    });
  },
  async resetPassword(req: any, res: Response) {
    const { password, new_password } = req.body;

    if (password === new_password) {
      return res
        .status(400)
        .json({ msg: 'Mật khẩu cũ và mật khẩu mới phải khác nhau' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { password: true },
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user?.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: 'Mật khẩu hiện tại không chính xác' });
      }

      const hashPw = await bcrypt.hash(new_password, 10);
      await prisma.user.update({
        where: { id: req.user.id },
        data: { password: hashPw },
      });

      return res.json({ msg: 'Đổi mật khẩu thành công' });
    }
  },
};

export default userController;
