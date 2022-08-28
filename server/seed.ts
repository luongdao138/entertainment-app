import prisma from './config/prisma';

const main = async () => {
  const data = await prisma.song.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      liked_by: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  console.log({ data });
};

main();
