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
  patient_id: string;
};

export type TakeMedicine = {
  id: string;
  medicine_id: string;
  status: MedicineTakenStatus;
}