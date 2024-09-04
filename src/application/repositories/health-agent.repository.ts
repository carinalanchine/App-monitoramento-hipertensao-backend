import { HealthAgent } from "../../domain/entities/HealthAgent";
import HttpError from "../../infra/exceptions/httpError";
import { prisma } from "../../infra/db/prisma";

class HealthAgentRepository {
  async createHealthAgent({
    name,
    cpf,
    hospitalId,
    password,
    role
  }: Omit<HealthAgent, "id">): Promise<{ id: string } | null> {
    try {
      const agentCreated = await prisma.user.create({
        data: {
          name,
          cpf,
          role,
          hospitalId,
          password
        }
      });

      if (!agentCreated)
        return null;

      return {
        id: agentCreated.id
      }

    } catch (error) {
      throw new HttpError("Error on create health agent", 500);
    }
  }
}

export default HealthAgentRepository;