-- CreateTable
CREATE TABLE "RecentSong" (
    "user_id" TEXT NOT NULL,
    "song_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecentSong_pkey" PRIMARY KEY ("user_id","song_id")
);

-- AddForeignKey
ALTER TABLE "RecentSong" ADD CONSTRAINT "RecentSong_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentSong" ADD CONSTRAINT "RecentSong_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
