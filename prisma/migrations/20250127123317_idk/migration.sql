-- DropForeignKey
ALTER TABLE "Enroll" DROP CONSTRAINT "Enroll_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Enroll" DROP CONSTRAINT "Enroll_email_fkey";

-- AddForeignKey
ALTER TABLE "Enroll" ADD CONSTRAINT "Enroll_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enroll" ADD CONSTRAINT "Enroll_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
