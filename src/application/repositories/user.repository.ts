import { RolesEnum } from "../../domain/entities/Role";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { prisma } from "../../infra/db/prisma";

class UserRepository implements IUserRepository {
  async findByCpf(cpf: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          cpf
        },
      });

      if (!user)
        return null;

      return {
        cpf: user.cpf,
        id: user.id,
        name: user.name,
        role: RolesEnum[user.role as keyof typeof RolesEnum],
        hospital_id: user.hospitalId,
        password: user.password
      }
    } catch (error) {
      throw new Error("Error on get user by CPF");
    }
  }
}

export default UserRepository;
