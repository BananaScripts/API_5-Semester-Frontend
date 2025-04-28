import api from "./api";
import { AgentCreate } from "../interfaces/agentCreate";
import { AgentResponse } from "../interfaces/agentResponse";
import { PaginatedResponse } from "../interfaces/paginatedResponse";
import { AgentUpdate } from "../interfaces/agentUpdate";

const AgentService = {
  async getAllAgents(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<AgentResponse>> {
    try {
      const response = await api.get<PaginatedResponse<AgentResponse>>(`/agent/agent`, {
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching agents: " + error);
    }
  },

  async createAgent(agentData: AgentCreate): Promise<AgentResponse> {
    try {
      const response = await api.post<AgentResponse>(`/agent/agent`, agentData);
      return response.data;
    } catch (error) {
      throw new Error("Error creating agent: " + error);
    }
  },

  async getAgentById(id: number): Promise<AgentResponse> {
    try {
      const response = await api.get<AgentResponse>(`/agent/agent/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching agent: " + error);
    }
  },

  async updateAgent(id: number, agentData: Partial<AgentUpdate>): Promise<AgentResponse> {
    try {
      const response = await api.put<AgentResponse>(`/agent/agent/${id}`, agentData);
      return response.data;
    } catch (error: any) {
      console.error("Error updating agent:", error.response?.data || error.message);
      throw new Error("Error updating agent: " + error);
    }
  },

  async deleteAgent(id: number): Promise<void> {
    try {
      await api.delete(`/agent/Agent/${id}`);
    } catch (error) {
      throw new Error("Error deleting agent: " + error);
    }
  },
};

export default AgentService;