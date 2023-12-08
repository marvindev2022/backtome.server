/*
  Warnings:

  - You are about to drop the column `messageId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_messageId_fkey";

-- AlterTable
ALTER TABLE "AnimalFound" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "LostAnimal" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "messageId",
ADD COLUMN     "firebaseMessageId" TEXT;

-- DropTable
DROP TABLE "Message";
