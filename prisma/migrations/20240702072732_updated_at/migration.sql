-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "hasPaidAccommodation" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasPaidRegistration" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasPaidTshirts" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "updatedAt" DROP DEFAULT;
