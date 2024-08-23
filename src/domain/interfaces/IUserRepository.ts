import { User } from "../entities/User";

export interface IUserRepository {
  findByCpf(cpf: string): Promise<User | null>;
}
