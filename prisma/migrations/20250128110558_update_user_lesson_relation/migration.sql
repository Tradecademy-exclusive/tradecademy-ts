/*
  Warnings:

  - You are about to drop the column `lessonId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lessonId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lessonId";

-- CreateTable
CREATE TABLE "_UserCompletedLessons" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserCompletedLessons_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserCompletedLessons_B_index" ON "_UserCompletedLessons"("B");

-- AddForeignKey
ALTER TABLE "_UserCompletedLessons" ADD CONSTRAINT "_UserCompletedLessons_A_fkey" FOREIGN KEY ("A") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCompletedLessons" ADD CONSTRAINT "_UserCompletedLessons_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
