/*
  Warnings:

  - You are about to drop the column `url` on the `Lesson` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "videoType" AS ENUM ('HTML5', 'External', 'Youtube', 'Vimeo');

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "url",
ADD COLUMN     "source" TEXT,
ADD COLUMN     "type" "videoType";
