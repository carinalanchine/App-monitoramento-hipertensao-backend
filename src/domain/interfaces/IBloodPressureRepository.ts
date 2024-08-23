

export interface IBloodPressureRepository {
    createBloodPressure( patientId: string, systolic: number, diastolic: number): Promise<{ id: string } | null>;
}