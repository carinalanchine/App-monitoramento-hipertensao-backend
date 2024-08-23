export enum DosageType {
    "MILLIGRAMS" = "MILLIGRAMS",
    "GRAMS" = "GRAMS",
}

export type Medicine = {
    id: string;
    name: string;
    color: string;
    patientId: string;
    initialDate: Date;
    intervalInHour: number;
    dosage: number;
    dosageType: DosageType;
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
