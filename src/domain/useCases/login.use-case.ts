import HttpError from "../../infra/exceptions/httpError";
import { ICriptography } from "../interfaces/ICriptographyAdapter";
import { IUserRepository } from "../interfaces/IUserRepository";
import jwt from "jsonwebtoken";

type LoginUseCaseInput = {
  cpf: string;
  password: string;
};

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private criptography: ICriptography
  ) { }

  async execute(body: LoginUseCaseInput) {
    const { cpf, password } = body;

    const user = await this.userRepository.findByCpf(cpf);

    if (!user)
      throw new HttpError("Usuário não encontrado", 404);

    const validPassword = this.criptography.compare(password, user.password);

    if (!validPassword)
      throw new HttpError("Senha ou CPF incorretos", 401);

    const token = this.generateToken(user.id, user.cpf, user.role, user.hospitalId)

    return { user, token };
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
