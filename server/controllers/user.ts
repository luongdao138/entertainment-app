import { Response } from 'express';
import prisma from '../config/prisma';

const userController = {
  async getLoggedInUser(req: any, res: Response) {
    return res.json({ user: req.user });
  },
  async updateProfile(req: any, res: Response) {
     const data = req.body;
     const user = req.user;

     if(data.email) {
       return res.status(400).json({ msg: 'Không được thay đổi email!'})
     } 

     await prisma.user.update({
        where: {
           id: user.id
        },
        data: data
     })

     return res.json({
         msg: 'Cập nhật thông tin cá nhân thành công'
     })
  }
};

export default userController;
