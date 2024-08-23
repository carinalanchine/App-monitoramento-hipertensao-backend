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

    if (!cpf) throw new Error("cpf is required");
    if (!password) throw new Error("password is required");

    const user = await this.userRepository.findByCpf(cpf);

    if (!user) throw new Error("user not found");

    const validPassword = this.criptography.compare(password, user.password);

    if (!validPassword) throw new Error("user not found");

    return this.generateToken(user.id, user.cpf, user.role_tag, user.hospital_id);
  }

  generateToken(userId: string, cpf: string, role: string, hospitalId: string) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET não definido");
    }

    const token = jwt.sign({ userId, cpf, role, hospitalId }, jwtSecret, {
      expiresIn: "1h",
    });

    return token;
  }
}
