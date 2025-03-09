/*
  Warnings:

  - You are about to drop the column `comment` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_teacherId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "comment",
ADD COLUMN     "content" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
