import { HealthAgent } from "../../domain/entities/HealthAgent";
import { prisma } from "../../infra/db/prisma";

class HealthAgentRepository {
  async createHealthAgent({
    name,
    cpf,
    hospital_id,
    password,
    role
  }: Omit<HealthAgent, "id">): Promise<{ id: string } | null> {
    try {
      const agentCreated = await prisma.user.create({
        data: {
          name,
          cpf,
          role,
          hospitalId: hospital_id,
          password
        }
      });

      if (!agentCreated)
        return null;

      return {
        id: agentCreated.id
      }

    } catch (error) {
      throw new Error("Error on create health agent");
    }
  }
}

export default HealthAgentRepository;