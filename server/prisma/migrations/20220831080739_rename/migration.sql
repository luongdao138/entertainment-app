/*
  Warnings:

  - You are about to drop the `FavouritePlayList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_favourite_song` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavouritePlayList" DROP CONSTRAINT "FavouritePlayList_playlist_id_fkey";

-- DropForeignKey
ALTER TABLE "FavouritePlayList" DROP CONSTRAINT "FavouritePlayList_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_favourite_song" DROP CONSTRAINT "_favourite_song_A_fkey";

-- DropForeignKey
ALTER TABLE "_favourite_song" DROP CONSTRAINT "_favourite_song_B_fkey";

-- DropTable
DROP TABLE "FavouritePlayList";

-- DropTable
DROP TABLE "_favourite_song";

-- CreateTable
CREATE TABLE "FavouritePlaylist" (
    "user_id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavouritePlaylist_pkey" PRIMARY KEY ("user_id","playlist_id")
);

-- CreateTable
CREATE TABLE "_FavouriteSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavouriteSong_AB_unique" ON "_FavouriteSong"("A", "B");

-- CreateIndex
CREATE INDEX "_FavouriteSong_B_index" ON "_FavouriteSong"("B");

-- AddForeignKey
ALTER TABLE "FavouritePlaylist" ADD CONSTRAINT "FavouritePlaylist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouritePlaylist" ADD CONSTRAINT "FavouritePlaylist_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouriteSong" ADD CONSTRAINT "_FavouriteSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouriteSong" ADD CONSTRAINT "_FavouriteSong_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
