import { response } from "express";
import { prisma } from "../../infra/db/prisma";



class BloodPressureRepository {
    async createBloodPressure(patientId: string, systolic: number, diastolic: number){
        try{
            const bloodPressureCreated = await prisma.bloodPressure.create({
                data: {
                    patientId,
                    systolic,
                    diastolic
                }
            });

            return {
                id: bloodPressureCreated.patientId
            }

        } catch (error) {
            throw new Error(`error on create blood pressure: ${error}`);
        }
    }
}

export default BloodPressureRepository;