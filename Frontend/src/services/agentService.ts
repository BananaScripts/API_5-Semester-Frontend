import api from "./api";
import { AgentCreate } from "../interfaces/agentCreate";
import { AgentResponse } from "../interfaces/agentResponse";
import { PaginatedResponse } from "../interfaces/paginatedResponse";
import { AgentUpdate } from "../interfaces/agentUpdate";

const AgentService = {
  async createAgent(agentData: AgentCreate): Promise<AgentResponse> {
    try {
      const response = await api.post<AgentResponse>("/agent/Agent", agentData);
      return response.data;
    } catch (error) {
      throw new Error("Error creating agent: " + error);
    }
  },
  
  async getAgentById(Id: number): Promise<AgentResponse> {
    try {
      const response = await api.get<AgentResponse>(`/agent/Agent/${Id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching agent: " + error);
    }
  },
  
  async updateAgent(Id: number, agentData: Partial<AgentUpdate>): Promise<AgentResponse> {
    try {
      const response = await api.put<AgentResponse>(`/agent/Agent/${Id}`, agentData);
      return response.data;
    } catch (error: any) {
      console.error("Error updating agent:", error.response?.data || error.message);
      throw new Error("Error updating agent: " + error);
    }
  },

  async deleteAgent(Id: number): Promise<void> {
    try {
      await api.delete(`/agent/Agent/${Id}`);
    } catch (error) {
      throw new Error("Error deleting agent: " + error);
    }
  },
  
  async getAllAgents(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<AgentResponse>> {
    try {
      const response = await api.get("/agent/Agent", {
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching agents: " + error);
    }
  },
};

export default AgentService;
