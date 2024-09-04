import { RolesEnum } from "./Role";

export type HealthAgent = {
  id: string;
  cpf: string;
  name: string;
  role: RolesEnum;
  password: string;
  hospitalId: string;
};