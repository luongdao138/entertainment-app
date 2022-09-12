/*
  Warnings:

  - You are about to drop the column `file` on the `Lyric` table. All the data in the column will be lost.
  - You are about to drop the column `lyric_id` on the `Word` table. All the data in the column will be lost.
  - Added the required column `sentence_id` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_lyric_id_fkey";

-- AlterTable
ALTER TABLE "Lyric" DROP COLUMN "file";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "lyric_id",
ADD COLUMN     "sentence_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Sentence" (
    "id" TEXT NOT NULL,
    "lyric_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_lyric_id_fkey" FOREIGN KEY ("lyric_id") REFERENCES "Lyric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
