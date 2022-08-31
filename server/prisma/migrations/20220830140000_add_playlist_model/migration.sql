-- DropForeignKey
ALTER TABLE "_favourite" DROP CONSTRAINT "_favourite_A_fkey";

-- CreateTable
CREATE TABLE "_favourite_playlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favourite_playlist_AB_unique" ON "_favourite_playlist"("A", "B");

-- CreateIndex
CREATE INDEX "_favourite_playlist_B_index" ON "_favourite_playlist"("B");

-- AddForeignKey
ALTER TABLE "_favourite" ADD CONSTRAINT "_favourite_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favourite_playlist" ADD CONSTRAINT "_favourite_playlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favourite_playlist" ADD CONSTRAINT "_favourite_playlist_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
