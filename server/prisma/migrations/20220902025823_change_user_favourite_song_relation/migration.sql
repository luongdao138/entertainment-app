/*
  Warnings:

  - You are about to drop the `_FavouriteSong` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `position` to the `FavouritePlaylist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_FavouriteSong" DROP CONSTRAINT "_FavouriteSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavouriteSong" DROP CONSTRAINT "_FavouriteSong_B_fkey";

-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "thumbnail" SET DEFAULT 'https://photo-zmp3.zmdcdn.me/artist_default_2.png';

-- AlterTable
ALTER TABLE "FavouritePlaylist" ADD COLUMN     "position" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_FavouriteSong";

-- CreateTable
CREATE TABLE "FavouriteSong" (
    "user_id" TEXT NOT NULL,
    "song_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavouriteSong_pkey" PRIMARY KEY ("user_id","song_id")
);

-- AddForeignKey
ALTER TABLE "FavouriteSong" ADD CONSTRAINT "FavouriteSong_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteSong" ADD CONSTRAINT "FavouriteSong_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
