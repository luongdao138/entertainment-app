/*
  Warnings:

  - You are about to alter the column `start_time` on the `Word` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `end_time` on the `Word` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "start_time" SET DATA TYPE INTEGER,
ALTER COLUMN "end_time" SET DATA TYPE INTEGER;
