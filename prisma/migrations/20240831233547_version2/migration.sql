/*
  Warnings:

  - You are about to drop the column `hospitalId` on the `users` table. All the data in the column will be lost.
  - Added the required column `hospital_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_hospitalId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "hospitalId",
ADD COLUMN     "hospital_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
