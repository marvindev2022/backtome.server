-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "complement" TEXT,
    "userId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalFound" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "found_location" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "distinctive_characteristics" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AnimalFound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LostAnimal" (
    "id" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "distinctive_characteristics" TEXT NOT NULL,
    "date_loss" TEXT NOT NULL,
    "location_loss" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LostAnimal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableAnimal" (
    "id" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "distinctive_characteristics" TEXT NOT NULL,
    "personality_description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AvailableAnimal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalFound" ADD CONSTRAINT "AnimalFound_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LostAnimal" ADD CONSTRAINT "LostAnimal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableAnimal" ADD CONSTRAINT "AvailableAnimal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
