export type Medicine = {
    id: string;
    name: string;
    patientId: string;
    interval: string;
    dosage: string;
    createdAt: Date;
    updatedAt: Date;
};

export enum MedicineTakenStatus {
    TAKEN = "TAKEN",
    NOT_TAKEN = "NOT_TAKEN",
    TAKEN_LATE = "TAKEN_LATE",
}

export type TakeMedicine = {
    id: string;
    medicineId: string;
    status: MedicineTakenStatus;
}
