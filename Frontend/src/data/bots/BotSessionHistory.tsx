export type SessionBot = {
  agentId: string;
  name: string;
  description: string;
  category: string;
  image: any;
  lastMessageSnippet?: string;
};

const sessionBotHistory: SessionBot[] = [];

export const addOrUpdateBotInSession = (bot: SessionBot) => {
  const index = sessionBotHistory.findIndex(b => b.agentId === bot.agentId);
  if (index >= 0) {
    sessionBotHistory.splice(index, 1);
  }
  sessionBotHistory.unshift(bot);
};

export const getSessionBotHistory = (): SessionBot[] => {
  return [...sessionBotHistory];
};
