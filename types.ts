
export enum Status {
  IDLE = 'idle',
  RESEARCHING = 'researching',
  DEFINING = 'defining',
  GENERATING = 'generating',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Agent {
  agent_name: string;
  agent_prompt: string;
}
