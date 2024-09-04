import { User } from "../../domain/entities/User";
import HttpError from "../../infra/exceptions/httpError";
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
        id: user.id,
        cpf: user.cpf,
        name: user.name,
        role: user.role,
        password: user.password,
        hospitalId: user.hospitalId
      }
    } catch (error) {
      throw new HttpError("Error on find user by CPF", 500);
    }
  }
}

export default UserRepository;
