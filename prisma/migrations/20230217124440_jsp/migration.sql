/*
  Warnings:

  - You are about to drop the column `isPublic` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "isPublic",
ADD COLUMN     "codePrivate" VARCHAR(100);
