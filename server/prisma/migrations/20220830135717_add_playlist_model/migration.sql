-- CreateEnum
CREATE TYPE "Privacy" AS ENUM ('private', 'public');

-- DropForeignKey
ALTER TABLE "_favourite" DROP CONSTRAINT "_favourite_A_fkey";

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "privacy" "Privacy" NOT NULL DEFAULT 'private',
ADD COLUMN     "public_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "thumnail" TEXT,
    "title" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "privacy" "Privacy" NOT NULL DEFAULT 'private',
    "play_random" BOOLEAN NOT NULL DEFAULT true,
    "public_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_belong_to" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_belong_to_AB_unique" ON "_belong_to"("A", "B");

-- CreateIndex
CREATE INDEX "_belong_to_B_index" ON "_belong_to"("B");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_belong_to" ADD CONSTRAINT "_belong_to_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_belong_to" ADD CONSTRAINT "_belong_to_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favourite" ADD CONSTRAINT "_favourite_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
