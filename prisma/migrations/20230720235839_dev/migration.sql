/*
  Warnings:

  - You are about to drop the column `age` on the `Ongs` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Ongs` table. All the data in the column will be lost.
  - Added the required column `address` to the `Ongs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Ongs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ongs" DROP COLUMN "age",
DROP COLUMN "text",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "website" TEXT;
