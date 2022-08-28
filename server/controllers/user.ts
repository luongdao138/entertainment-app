import { Response } from 'express';

const userController = {
  async getLoggedInUser(req: any, res: Response) {
    return res.json({ user: req.user });
  },
};

export default userController;
