/*
  Warnings:

  - You are about to drop the column `drawSession` on the `Note` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "drawSession",
ADD COLUMN     "content" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
