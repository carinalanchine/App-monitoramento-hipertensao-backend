export enum MedicineTakenStatus {
  TAKEN = "TAKEN",
  NOT_TAKEN = "NOT_TAKEN",
  TAKEN_LATE = "TAKEN_LATE"
}

export type Medicine = {
  id: string;
  title: string;
  interval: string;
  dosage: string;
  patientId: string;
};

export type TakeMedicine = {
  id: string;
  medicineId: string;
  status: MedicineTakenStatus;
}