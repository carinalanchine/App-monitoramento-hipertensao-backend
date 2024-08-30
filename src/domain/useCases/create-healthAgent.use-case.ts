import { ICriptography } from "../interfaces/ICriptographyAdapter";
import { IHealthAgentRepository } from "../interfaces/IHealthAgentRepository";
import { RolesEnum } from "../entities/Role";

type CreateHealthAgentUseCaseInput = {
  name: string;
  cpf: string;
  password: string;
  hospitalID: string;
};

export class CreateHealthAgentUseCase {
  constructor(
    private healthAgentRepository: IHealthAgentRepository,
    private criptography: ICriptography
  ) { }

  async execute(body: CreateHealthAgentUseCaseInput) {
    const { name, cpf, password, hospitalID } = body;

    if (!name) throw new Error("name is required");
    if (!hospitalID) throw new Error("hospital ID is required");
    if (!cpf) throw new Error("cpf is required");
    if (!password) throw new Error("password is required");

    const encryptedPassword = this.criptography.encrypt(password);

    const user = await this.healthAgentRepository.create(
      name,
      cpf,
      encryptedPassword,
      RolesEnum.HEALTH_AGENT,
      hospitalID
    );

    if (!user) throw new Error("error on doctor registration");

    return user;
  }
}