export interface AgentCreate {
  Name: string;
  Description?: string;
  Config: AgentConfig;
}

export interface AgentConfig {
  SystemPrompt: string;
  AllowedFileTypes: string[];
}