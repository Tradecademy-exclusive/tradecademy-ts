/*
  Warnings:

  - Added the required column `chapter` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "chapter" INTEGER NOT NULL;
