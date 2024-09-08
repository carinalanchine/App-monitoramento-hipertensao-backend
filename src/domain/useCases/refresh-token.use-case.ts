import jwt from "jsonwebtoken";

type UserInput = {
  userId: string,
  cpf: string,
  role: string,
  hospitalId: string
}

export class RefreshTokenUseCase {
  constructor() { }

  async execute(user: UserInput) {
    const token = this.generateToken(user.userId, user.cpf, user.role, user.hospitalId)

    return { token };
  }

  generateToken(userId: string, cpf: string, role: string, hospitalId: string) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret)
      throw new Error("JWT_SECRET não definido");

    const accessToken = jwt.sign({ userId, cpf, role, hospitalId }, jwtSecret, { expiresIn: "1h", });
    const refreshToken = jwt.sign({ userId, cpf, role, hospitalId }, jwtSecret, { expiresIn: "30 days", });

    return { accessToken, refreshToken };
  }
}
