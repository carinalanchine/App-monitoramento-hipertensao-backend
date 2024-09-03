import { HealthAgent } from "../entities/HealthAgent";

export interface IHealthAgentRepository {
  createHealthAgent(agent: Omit<HealthAgent, "id">): Promise<{ id: string } | null>;
}