-- CreateTable
CREATE TABLE "blood-pressure" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "systolic" INTEGER NOT NULL,
    "diastolic" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blood-pressure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blood-pressure" ADD CONSTRAINT "blood-pressure_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
