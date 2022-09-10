import prisma from './config/prisma';

const mockUsers = {};

const main = async () => {
  // const data = await prisma.user.update({
  //     where: {
  //       id: 'fe4ab4a8-cf6e-4ca3-93a9-e73f24cd6322'
  //     },
  //     data: {
  //        is_premium: false,
  //        is_verified: true
  //     }
  // })

  // console.log({ data });
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       email: 'tu@gmail.com',
  //       full_name: 'Đào Cẩm Tú',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'quan@gmail.com',
  //       full_name: 'Đào Văn Quân',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'duong@gmail.com',
  //       full_name: 'Đào Văn Dương',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'phong@gmail.com',
  //       full_name: 'Nguyễn Trọng Phong',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'huong@gmail.com',
  //       full_name: 'Nguyễn Thị Hường',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'tronggmail.com',
  //       full_name: 'Dương Đức Trọng',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'phuc@gmail.com',
  //       full_name: 'Trần Văn Phúc',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'tiep@gmail.com',
  //       full_name: 'Trịnh Đức Tiệp',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //   ],
  // });

  console.log('success');
};

main();
