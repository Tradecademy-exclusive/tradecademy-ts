-- CreateEnum
CREATE TYPE "publicType" AS ENUM ('Draft', 'Private', 'Published');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "learn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "publishedCourse" "publicType" NOT NULL DEFAULT 'Published';
