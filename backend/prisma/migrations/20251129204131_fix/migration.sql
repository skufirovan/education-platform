/*
  Warnings:

  - You are about to drop the column `contentUrl` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `externalUrl` on the `LessonMaterial` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `LessonMaterial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "lessonMaterialId" TEXT;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "contentUrl";

-- AlterTable
ALTER TABLE "LessonMaterial" DROP COLUMN "externalUrl",
DROP COLUMN "fileUrl";

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_lessonMaterialId_fkey" FOREIGN KEY ("lessonMaterialId") REFERENCES "LessonMaterial"("id") ON DELETE SET NULL ON UPDATE CASCADE;
