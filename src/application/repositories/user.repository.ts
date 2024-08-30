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

      if (!user) {
        return null;
      }

      return {
        cpf: user.cpf,
        id: user.id,
        hospital_id: user.hospital_id,
        name: user.name,
        password: user.password,
        role_tag: RolesEnum[user.role_tag as keyof typeof RolesEnum],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    } catch (error) {
      throw new Error("error on get user by cpf");
    }
  }
}

export default UserRepository;
