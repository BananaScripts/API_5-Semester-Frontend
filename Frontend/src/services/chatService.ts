import api from './api';
import type { ImageSourcePropType } from 'react-native';

export type Bot = {
  id: string;
  agentId: number; // 👈 aqui
  name: string;
  descricao: string;
  category: string;
  image: ImageSourcePropType;
  response: (message: string) => string;
};

type AgentResponse = {
  agentId: number;
  name: string;
  description: string;
  status: number;
};

type PaginatedResponse = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: AgentResponse[];
};

const IMAGES = [
  require('../../assets/bot01.png'),
  require('../../assets/bot02.png'),
  require('../../assets/bot03.png'),
  require('../../assets/bot04.png'),
];

export async function getBots(
  page: number = 1,
  pageSize: number = 10
): Promise<Bot[]> {
  try {
    const response = await api.get<PaginatedResponse>('/agent/agent', {
      params: { page, pageSize },
    });

    const data = response?.data;
    if (!data || !data.items || !Array.isArray(data.items)) {
      console.warn('Resposta inesperada ao buscar bots:', data);
      return [];
    }

    const items = data.items;
    if (items.length === 0) {
      console.warn('Nenhum bot encontrado.');
      return [];
    }

    return items.map((agent, index) => ({
      id: String(agent.agentId),
      agentId: agent.agentId, // 👈 aqui
      name: agent.name,
      descricao: agent.description,
      category: String(agent.status),
      image: IMAGES[index % IMAGES.length],
      response: (message: string) => {
        console.log(`Pergunta ao bot ${agent.agentId}:`, message);
        return 'A lógica de resposta ainda não está implementada.';
      },
    }));
  } catch (error) {
    console.error('Erro ao buscar bots:', error);
    return [];
  }
}

export const getWebSocketUrl = (chatId: string) => {
  return `ws://10.0.2.2:7254/ws/chat/open`;
};
