/*
  Warnings:

  - Added the required column `dosage` to the `medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dosage_type` to the `medicine` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DosageType" AS ENUM ('MILLIGRAMS', 'GRAMS');

-- AlterTable
ALTER TABLE "medicine" ADD COLUMN     "dosage" INTEGER NOT NULL,
ADD COLUMN     "dosage_type" "DosageType" NOT NULL;
