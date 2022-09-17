/*
  Warnings:

  - You are about to drop the `RecentSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecentSong" DROP CONSTRAINT "RecentSong_song_id_fkey";

-- DropForeignKey
ALTER TABLE "RecentSong" DROP CONSTRAINT "RecentSong_user_id_fkey";

-- DropTable
DROP TABLE "RecentSong";

-- CreateTable
CREATE TABLE "HistorySong" (
    "user_id" TEXT NOT NULL,
    "song_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistorySong_pkey" PRIMARY KEY ("user_id","song_id")
);

-- AddForeignKey
ALTER TABLE "HistorySong" ADD CONSTRAINT "HistorySong_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorySong" ADD CONSTRAINT "HistorySong_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
