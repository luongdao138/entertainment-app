import { Response } from 'express';
import prisma from '../config/prisma';

const categoryController = {
  async getAllCategories(req: any, res: Response) {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return res.json({ categories });
  },
};

export default categoryController;
