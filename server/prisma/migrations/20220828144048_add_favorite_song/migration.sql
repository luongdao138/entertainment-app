-- CreateTable
CREATE TABLE "_favourite" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favourite_AB_unique" ON "_favourite"("A", "B");

-- CreateIndex
CREATE INDEX "_favourite_B_index" ON "_favourite"("B");

-- AddForeignKey
ALTER TABLE "_favourite" ADD CONSTRAINT "_favourite_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favourite" ADD CONSTRAINT "_favourite_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
