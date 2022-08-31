/*
  Warnings:

  - You are about to drop the column `thumnail` on the `Playlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "thumnail",
ADD COLUMN     "thumbnail" TEXT NOT NULL DEFAULT 'https://photo-zmp3.zmdcdn.me/album_default.png';
