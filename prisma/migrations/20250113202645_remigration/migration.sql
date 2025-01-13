/*
  Warnings:

  - Added the required column `planId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "planId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "steps" TEXT[],

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousPlan" (
    "id" TEXT NOT NULL,
    "steps" TEXT[],
    "userId" TEXT,

    CONSTRAINT "PreviousPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FocusPoint" (
    "id" TEXT NOT NULL,
    "steps" TEXT[],

    CONSTRAINT "FocusPoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousPlan" ADD CONSTRAINT "PreviousPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
