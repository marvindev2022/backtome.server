-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "number" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" TEXT;

-- CreateTable
CREATE TABLE "Ongs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Ongs_pkey" PRIMARY KEY ("id")
);
