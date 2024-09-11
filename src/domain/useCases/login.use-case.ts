import { generateToken } from "../util/GenerateToken";
import HttpError from "../../infra/exceptions/httpError";
import { ICriptography } from "../interfaces/ICriptographyAdapter";
import { IUserRepository } from "../interfaces/IUserRepository";

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
      throw new HttpError("Senha ou CPF incorreto", 401);

    const validPassword = this.criptography.compare(password, user.password);

    if (!validPassword)
      throw new HttpError("Senha ou CPF incorreto", 401);

    const token = generateToken(user.id, user.cpf, user.role, user.hospitalId)

    return { user, token };
  }
}
