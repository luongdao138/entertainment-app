/*
  Warnings:

  - You are about to drop the `_PlaylistToSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlaylistToSong" DROP CONSTRAINT "_PlaylistToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToSong" DROP CONSTRAINT "_PlaylistToSong_B_fkey";

-- DropTable
DROP TABLE "_PlaylistToSong";

-- CreateTable
CREATE TABLE "PlaylistSong" (
    "playlist_id" TEXT NOT NULL,
    "song_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" INTEGER NOT NULL,

    CONSTRAINT "PlaylistSong_pkey" PRIMARY KEY ("playlist_id","song_id")
);

-- AddForeignKey
ALTER TABLE "PlaylistSong" ADD CONSTRAINT "PlaylistSong_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistSong" ADD CONSTRAINT "PlaylistSong_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
