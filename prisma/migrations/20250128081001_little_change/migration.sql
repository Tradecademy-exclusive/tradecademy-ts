/*
  Warnings:

  - You are about to drop the column `userId` on the `Lesson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_userId_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lessonId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
