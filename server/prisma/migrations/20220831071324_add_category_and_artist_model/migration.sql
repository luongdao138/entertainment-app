-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL DEFAULT 'https://ca.slack-edge.com/T2JUP6F0A-U03L7HL9WBF-g6ea89c2bc88-512',
    "birthday" TIMESTAMP(3),
    "biography" TEXT,
    "national" TEXT,
    "realname" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_playlist_artist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_category_playlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_playlist_artist_AB_unique" ON "_playlist_artist"("A", "B");

-- CreateIndex
CREATE INDEX "_playlist_artist_B_index" ON "_playlist_artist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_category_playlist_AB_unique" ON "_category_playlist"("A", "B");

-- CreateIndex
CREATE INDEX "_category_playlist_B_index" ON "_category_playlist"("B");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_playlist_artist" ADD CONSTRAINT "_playlist_artist_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_playlist_artist" ADD CONSTRAINT "_playlist_artist_B_fkey" FOREIGN KEY ("B") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_category_playlist" ADD CONSTRAINT "_category_playlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_category_playlist" ADD CONSTRAINT "_category_playlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
