import { RolesEnum } from "./Role";

export type Patient = {
  id: string;
  cpf: string;
  name: string;
  role: RolesEnum;
  password: string;
  hospitalId: string;
};
