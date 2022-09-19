/*
  Warnings:

  - You are about to drop the column `parentId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtistToPlaylist` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserPlaylistType" AS ENUM ('own', 'member', 'personal');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToPlaylist" DROP CONSTRAINT "_ArtistToPlaylist_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToPlaylist" DROP CONSTRAINT "_ArtistToPlaylist_B_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "parentId",
ADD COLUMN     "parent_id" TEXT;

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "is_album" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_offical" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "biography" TEXT,
ADD COLUMN     "is_artist" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "national" TEXT,
ADD COLUMN     "realname" TEXT,
ADD COLUMN     "short_biography" TEXT;

-- DropTable
DROP TABLE "Artist";

-- DropTable
DROP TABLE "_ArtistToPlaylist";

-- CreateTable
CREATE TABLE "UserPlaylist" (
    "user_id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,
    "type" "UserPlaylistType" NOT NULL DEFAULT 'personal',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPlaylist_pkey" PRIMARY KEY ("user_id","playlist_id")
);

-- AddForeignKey
ALTER TABLE "UserPlaylist" ADD CONSTRAINT "UserPlaylist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlaylist" ADD CONSTRAINT "UserPlaylist_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
