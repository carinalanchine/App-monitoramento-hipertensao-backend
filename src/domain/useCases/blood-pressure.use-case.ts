import { IBloodPressureRepository } from "../interfaces/IBloodPressureRepository";

type CreateBloodPressureUseCaseInput = {
    patientId: string,
    systolic: number,
    diastolic: number
}


export class CreateBloodPressureUseCase {
    constructor (private repositoryBloodPressure: IBloodPressureRepository) { }

    async execute( body: CreateBloodPressureUseCaseInput ) { //O que passar como argumento?
        const {patientId, systolic, diastolic} = body; 

        if (!patientId) throw new Error("patient id is required");
        if (!systolic) throw new Error("systolic is required");
        if (!diastolic) throw new Error("diastolic is required");

        const bloodPressure = await this.repositoryBloodPressure.createBloodPressure(patientId, systolic, diastolic);

        if (!bloodPressure) {
            throw new Error("error in blood pressure registration")
        }

        return bloodPressure;
    }
}