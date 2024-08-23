/*
  Warnings:

  - You are about to drop the column `doctorId` on the `medical-appointment` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `medical-appointment` table. All the data in the column will be lost.
  - You are about to drop the `exam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `doctor_id` to the `medical-appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `medical-appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "medical-appointment" DROP CONSTRAINT "medical-appointment_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "medical-appointment" DROP CONSTRAINT "medical-appointment_patientId_fkey";

-- AlterTable
ALTER TABLE "medical-appointment" DROP COLUMN "doctorId",
DROP COLUMN "patientId",
ADD COLUMN     "doctor_id" TEXT NOT NULL,
ADD COLUMN     "patient_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "exam";

-- CreateTable
CREATE TABLE "medicine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient-medicine" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "medicine_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient-medicine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "patient-medicine" ADD CONSTRAINT "patient-medicine_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient-medicine" ADD CONSTRAINT "patient-medicine_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical-appointment" ADD CONSTRAINT "medical-appointment_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical-appointment" ADD CONSTRAINT "medical-appointment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
