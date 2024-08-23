/*
  Warnings:

  - You are about to drop the column `doctor` on the `medical-appointment` table. All the data in the column will be lost.
  - Added the required column `doctorId` to the `medical-appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `medical-appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medical-appointment" DROP COLUMN "doctor",
ADD COLUMN     "doctorId" TEXT NOT NULL,
ADD COLUMN     "patientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "medical-appointment" ADD CONSTRAINT "medical-appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical-appointment" ADD CONSTRAINT "medical-appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
