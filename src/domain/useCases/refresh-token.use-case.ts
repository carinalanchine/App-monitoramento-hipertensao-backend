import { generateToken } from "../util/GenerateToken";

type UserInput = {
  userId: string,
  cpf: string,
  role: string,
  hospitalId: string
}

export class RefreshTokenUseCase {
  constructor() { }

  async execute(user: UserInput) {
    const token = generateToken(user.userId, user.cpf, user.role, user.hospitalId)

    return { token };
  }
}
