/*
  Warnings:

  - You are about to drop the column `steps` on the `FocusPoint` table. All the data in the column will be lost.
  - Added the required column `description` to the `FocusPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `focusPointId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FocusPoint" DROP COLUMN "steps",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "focusPointId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_focusPointId_fkey" FOREIGN KEY ("focusPointId") REFERENCES "FocusPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
