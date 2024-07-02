-- CreateEnum
CREATE TYPE "TravelModes" AS ENUM ('BOAT', 'CAR', 'MOTORCYCLE', 'PLANE', 'SPACE_SHUTTLE', 'TRAIN');

-- CreateEnum
CREATE TYPE "BookingModes" AS ENUM ('YES', 'WITH_SOMEONE', 'NO');

-- CreateEnum
CREATE TYPE "TShirtsSizes" AS ENUM ('S', 'M', 'L', 'XL', 'TwoXL', 'ThreeXL', 'FourXL', 'FiveXL');

-- CreateTable
CREATE TABLE "Gift" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "ownedById" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "selectedById" TEXT,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "box" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "emergencyName" TEXT NOT NULL,
    "emergencyPhone" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,
    "chapterFunction" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "licencePlate" TEXT NOT NULL,
    "travelMode" "TravelModes" NOT NULL,
    "booking" "BookingModes" NOT NULL,
    "willShareRoom" BOOLEAN NOT NULL,
    "staysWith" TEXT,
    "languages" TEXT,
    "tshirtsAmount" INTEGER,
    "tshirtsSize" "TShirtsSizes",
    "hasAgreedToPay" BOOLEAN NOT NULL,
    "hasAgreedToData" BOOLEAN NOT NULL,
    "hasAgreedToPicture" BOOLEAN NOT NULL,
    "accommodationId" INTEGER,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accommodation" (
    "id" SERIAL NOT NULL,
    "ref" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "beds" INTEGER NOT NULL,
    "available" INTEGER NOT NULL,
    "price1" INTEGER NOT NULL,
    "price2" INTEGER NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_selectedById_fkey" FOREIGN KEY ("selectedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
