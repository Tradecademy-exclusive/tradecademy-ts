/*
  Warnings:

  - You are about to drop the column `userId` on the `Enroll` table. All the data in the column will be lost.
  - Added the required column `email` to the `Enroll` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Enroll" DROP CONSTRAINT "Enroll_userId_fkey";

-- AlterTable
ALTER TABLE "Enroll" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Enroll" ADD CONSTRAINT "Enroll_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
