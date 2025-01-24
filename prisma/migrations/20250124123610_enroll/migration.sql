-- CreateEnum
CREATE TYPE "enrollStatus" AS ENUM ('Approved', 'Cancelled', 'Pending');

-- CreateTable
CREATE TABLE "Enroll" (
    "id" TEXT NOT NULL,
    "status" "enrollStatus" NOT NULL DEFAULT 'Pending',
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enroll_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Enroll" ADD CONSTRAINT "Enroll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enroll" ADD CONSTRAINT "Enroll_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
