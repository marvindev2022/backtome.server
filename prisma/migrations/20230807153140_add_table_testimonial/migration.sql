-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "resolved" TEXT NOT NULL DEFAULT 'pendent',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pendent';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reencounter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "voluntary" BOOLEAN NOT NULL DEFAULT false;
