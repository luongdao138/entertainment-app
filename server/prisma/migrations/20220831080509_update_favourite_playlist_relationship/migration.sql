/*
  Warnings:

  - You are about to drop the `_belong_to` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_category_playlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_favourite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_favourite_playlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_playlist_artist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_belong_to" DROP CONSTRAINT "_belong_to_A_fkey";

-- DropForeignKey
ALTER TABLE "_belong_to" DROP CONSTRAINT "_belong_to_B_fkey";

-- DropForeignKey
ALTER TABLE "_category_playlist" DROP CONSTRAINT "_category_playlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_category_playlist" DROP CONSTRAINT "_category_playlist_B_fkey";

-- DropForeignKey
ALTER TABLE "_favourite" DROP CONSTRAINT "_favourite_A_fkey";

-- DropForeignKey
ALTER TABLE "_favourite" DROP CONSTRAINT "_favourite_B_fkey";

-- DropForeignKey
ALTER TABLE "_favourite_playlist" DROP CONSTRAINT "_favourite_playlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_favourite_playlist" DROP CONSTRAINT "_favourite_playlist_B_fkey";

-- DropForeignKey
ALTER TABLE "_playlist_artist" DROP CONSTRAINT "_playlist_artist_A_fkey";

-- DropForeignKey
ALTER TABLE "_playlist_artist" DROP CONSTRAINT "_playlist_artist_B_fkey";

-- DropTable
DROP TABLE "_belong_to";

-- DropTable
DROP TABLE "_category_playlist";

-- DropTable
DROP TABLE "_favourite";

-- DropTable
DROP TABLE "_favourite_playlist";

-- DropTable
DROP TABLE "_playlist_artist";

-- CreateTable
CREATE TABLE "FavouritePlayList" (
    "user_id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavouritePlayList_pkey" PRIMARY KEY ("user_id","playlist_id")
);

-- CreateTable
CREATE TABLE "_favourite_song" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PlaylistToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArtistToPlaylist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToPlaylist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favourite_song_AB_unique" ON "_favourite_song"("A", "B");

-- CreateIndex
CREATE INDEX "_favourite_song_B_index" ON "_favourite_song"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistToSong_AB_unique" ON "_PlaylistToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistToSong_B_index" ON "_PlaylistToSong"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToPlaylist_AB_unique" ON "_ArtistToPlaylist"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToPlaylist_B_index" ON "_ArtistToPlaylist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPlaylist_AB_unique" ON "_CategoryToPlaylist"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPlaylist_B_index" ON "_CategoryToPlaylist"("B");

-- AddForeignKey
ALTER TABLE "FavouritePlayList" ADD CONSTRAINT "FavouritePlayList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouritePlayList" ADD CONSTRAINT "FavouritePlayList_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favourite_song" ADD CONSTRAINT "_favourite_song_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favourite_song" ADD CONSTRAINT "_favourite_song_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToSong" ADD CONSTRAINT "_PlaylistToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToSong" ADD CONSTRAINT "_PlaylistToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToPlaylist" ADD CONSTRAINT "_ArtistToPlaylist_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToPlaylist" ADD CONSTRAINT "_ArtistToPlaylist_B_fkey" FOREIGN KEY ("B") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPlaylist" ADD CONSTRAINT "_CategoryToPlaylist_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPlaylist" ADD CONSTRAINT "_CategoryToPlaylist_B_fkey" FOREIGN KEY ("B") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
