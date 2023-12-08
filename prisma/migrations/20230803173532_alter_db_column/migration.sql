-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "complement" SET DEFAULT '',
ALTER COLUMN "number" SET DEFAULT '';

-- AlterTable
ALTER TABLE "AnimalFound" ALTER COLUMN "photo" SET DEFAULT ARRAY['']::TEXT[];

-- AlterTable
ALTER TABLE "AvailableAnimal" ALTER COLUMN "photo" SET DEFAULT ARRAY['']::TEXT[];

-- AlterTable
ALTER TABLE "LostAnimal" ALTER COLUMN "photo" SET DEFAULT ARRAY['']::TEXT[];

-- AlterTable
ALTER TABLE "Ongs" ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "logo" SET DEFAULT '',
ALTER COLUMN "website" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "motivoDesativacao" TEXT DEFAULT '',
ALTER COLUMN "age" SET DEFAULT '',
ALTER COLUMN "photo" SET DEFAULT '';
