/*
  Warnings:

  - A unique constraint covering the columns `[lessonMaterialId]` on the table `Attachment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_assignmentSubmissionId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_lessonMaterialId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_lessonMaterialId_key" ON "Attachment"("lessonMaterialId");

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_lessonMaterialId_fkey" FOREIGN KEY ("lessonMaterialId") REFERENCES "LessonMaterial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_assignmentSubmissionId_fkey" FOREIGN KEY ("assignmentSubmissionId") REFERENCES "AssignmentSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
