/*
  Warnings:

  - Added the required column `subject` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "subject" TEXT NOT NULL;
