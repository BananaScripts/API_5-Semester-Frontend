export interface AgentUpdate {
  Name: string;
  Description: string;
  Config: {
    SystemPrompt: string;
    AllowedFileTypes: string[];
    AllowedUserIds: number[];
  };
}
