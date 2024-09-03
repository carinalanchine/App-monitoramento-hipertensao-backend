/*
  Warnings:

  - You are about to drop the column `role_tag` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `list-video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medical-appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medicine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "list-video" DROP CONSTRAINT "list-video_hospital_id_fkey";

-- DropForeignKey
ALTER TABLE "medical-appointment" DROP CONSTRAINT "medical-appointment_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "medical-appointment" DROP CONSTRAINT "medical-appointment_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "medicine" DROP CONSTRAINT "medicine_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "medicine-taken" DROP CONSTRAINT "medicine-taken_medicine_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role_tag",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "list-video";

-- DropTable
DROP TABLE "medical-appointment";

-- DropTable
DROP TABLE "medicine";

-- DropEnum
DROP TYPE "DosageType";

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicines" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicines" ADD CONSTRAINT "medicines_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine-taken" ADD CONSTRAINT "medicine-taken_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
