
import { GoogleGenAI, Type } from "@google/genai";
import { Agent } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const agentCreationSchema = {
  type: Type.OBJECT,
  properties: {
    agent_name: {
      type: Type.STRING,
      description: 'A creative and descriptive name for the new AI agent. Should be in English.',
    },
    agent_prompt: {
      type: Type.STRING,
      description: 'The detailed, comprehensive prompt in English that defines the new AI agent\'s behavior, persona, capabilities, constraints, and instructions. The prompt should be ready to be used by a powerful language model.',
    },
  },
  required: ['agent_name', 'agent_prompt'],
};

export const createAgent = async (idea: string): Promise<Agent> => {
  try {
    const systemInstruction = `You are a "Meta-Agent," an expert system for architecting and creating new, specialized AI agents. Your responses must be in English.
    When given a user's idea, you must perform the following sequence:
    1. Research: Synthesize the latest trends, tools, and knowledge relevant to the user's idea to ensure the new agent is modern and effective.
    2. Define Role: Clearly define the new agent's name, its core purpose, and key responsibilities. The name should be creative, descriptive, and reflect its function.
    3. Generate Prompt: Construct a detailed, comprehensive, and clear prompt for this new agent. This prompt becomes the agent's core programming. It must include its persona, capabilities, constraints, and instructions on how to interact with users.

    Your final output must be a single, valid JSON object conforming to the provided schema. Do not include any other text, explanations, or markdown formatting before or after the JSON object.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Here is the user's idea: "${idea}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: agentCreationSchema,
        temperature: 0.7,
      }
    });

    const jsonText = response.text.trim();
    const agentData = JSON.parse(jsonText);
    
    return agentData as Agent;

  } catch (error) {
    console.error("Error creating agent with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate agent. Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the agent.");
  }
};
