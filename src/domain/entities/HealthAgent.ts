import { RolesEnum } from "./Role";

export type HealthAgent = {
  id: string;
  cpf: string;
  name: string;
  role: RolesEnum;
  password: string;
  hospital_id: string;
};