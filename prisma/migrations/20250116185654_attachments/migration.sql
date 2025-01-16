/*
  Warnings:

  - You are about to drop the column `PDF` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "PDF",
ADD COLUMN     "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[];
