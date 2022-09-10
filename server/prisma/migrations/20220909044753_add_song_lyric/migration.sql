-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "duration" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Lyric" (
    "id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "song_id" TEXT NOT NULL,

    CONSTRAINT "Lyric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL,
    "start_time" BIGINT NOT NULL,
    "end_time" BIGINT NOT NULL,
    "data" TEXT NOT NULL,
    "lyric_id" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lyric_song_id_key" ON "Lyric"("song_id");

-- AddForeignKey
ALTER TABLE "Lyric" ADD CONSTRAINT "Lyric_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_lyric_id_fkey" FOREIGN KEY ("lyric_id") REFERENCES "Lyric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
