/*
  Warnings:

  - You are about to drop the column `name` on the `Report` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `photo` to the `AvailableAnimal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `LostAnimal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportedUserId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportingUserId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableAnimal" ADD COLUMN     "photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LostAnimal" ADD COLUMN     "photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "messageId" TEXT,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "reportedUserId" TEXT NOT NULL,
ADD COLUMN     "reportingUserId" TEXT NOT NULL,
ADD COLUMN     "resolved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportingUserId_fkey" FOREIGN KEY ("reportingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
