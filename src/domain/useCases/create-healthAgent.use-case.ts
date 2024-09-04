import { ICriptography } from "../interfaces/ICriptographyAdapter";
import { IHealthAgentRepository } from "../interfaces/IHealthAgentRepository";
import { RolesEnum } from "../entities/Role";
import { HealthAgent } from "../entities/HealthAgent";
import HttpError from "../../infra/exceptions/httpError";

export class CreateHealthAgentUseCase {
  constructor(
    private healthAgentRepository: IHealthAgentRepository,
    private criptography: ICriptography
  ) { }

  async execute(agent: Omit<Omit<HealthAgent, "id">, "role">) {
    const encryptedPassword = this.criptography.encrypt(agent.password);

    const agentCreated = await this.healthAgentRepository.createHealthAgent({
      ...agent,
      password: encryptedPassword,
      role: RolesEnum.HEALTH_AGENT
    });

    if (!agentCreated)
      throw new HttpError("Agente de saúde não criado", 500);

    return { id: agentCreated.id };
  }
}