/*
  Warnings:

  - You are about to drop the `signal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "signal" DROP CONSTRAINT "signal_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "signal" DROP CONSTRAINT "signal_quizId_fkey";

-- DropTable
DROP TABLE "signal";

-- CreateTable
CREATE TABLE "Signal" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    "isForCreator" BOOLEAN NOT NULL DEFAULT false,
    "isForAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Signal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Signal" ADD CONSTRAINT "Signal_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signal" ADD CONSTRAINT "Signal_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
