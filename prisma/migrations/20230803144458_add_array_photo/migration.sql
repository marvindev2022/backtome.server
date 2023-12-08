/*
  Warnings:

  - The `photo` column on the `AnimalFound` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `photo` column on the `AvailableAnimal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `photo` column on the `LostAnimal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AnimalFound" DROP COLUMN "photo",
ADD COLUMN     "photo" TEXT[];

-- AlterTable
ALTER TABLE "AvailableAnimal" DROP COLUMN "photo",
ADD COLUMN     "photo" TEXT[];

-- AlterTable
ALTER TABLE "LostAnimal" DROP COLUMN "photo",
ADD COLUMN     "photo" TEXT[];
