/*
  Warnings:

  - Added the required column `status` to the `Lyric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lyric" ADD COLUMN     "status" INTEGER NOT NULL;
