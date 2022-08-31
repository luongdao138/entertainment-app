/*
  Warnings:

  - Made the column `thumnail` on table `Playlist` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "thumnail" SET NOT NULL,
ALTER COLUMN "thumnail" SET DEFAULT 'https://photo-zmp3.zmdcdn.me/album_default.png';
