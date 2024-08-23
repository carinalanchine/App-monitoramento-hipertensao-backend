/*
  Warnings:

  - You are about to drop the `patient-medicine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `initial_date` to the `medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interval_in_hour` to the `medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `medicine` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MedicineTakenStatus" AS ENUM ('TAKEN', 'NOT_TAKEN', 'TAKEN_LATE');

-- DropForeignKey
ALTER TABLE "patient-medicine" DROP CONSTRAINT "patient-medicine_medicine_id_fkey";

-- DropForeignKey
ALTER TABLE "patient-medicine" DROP CONSTRAINT "patient-medicine_patient_id_fkey";

-- AlterTable
ALTER TABLE "medicine" ADD COLUMN     "initial_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "interval_in_hour" INTEGER NOT NULL,
ADD COLUMN     "patient_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "patient-medicine";

-- CreateTable
CREATE TABLE "medicine-taken" (
    "id" TEXT NOT NULL,
    "medicine_id" TEXT NOT NULL,
    "status" "MedicineTakenStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicine-taken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine-taken" ADD CONSTRAINT "medicine-taken_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
