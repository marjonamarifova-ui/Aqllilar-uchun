import { GoogleGenAI } from "@google/genai";
import { Level } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are a dream weaver, crafting short, poetic, and slightly mysterious fragments of a story for a game called 'The Dream Path'.
The player is journeying through their own mind, unlocking memories by reaching a target number.
Your response should be a beautiful, reflective, and slightly cryptic story fragment of 2-3 sentences.
The story should feel like a half-remembered dream.
Do not use markdown. Just return the plain text of the story fragment.`;

export const generateLevelStory = async (level: Level): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `The theme of this memory is "${level.storyTheme}". The number that unlocked it was ${level.target}. Weave a memory fragment about this.`,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.8,
            topP: 0.9,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "The memory flickers and fades. The connection is lost in the static of the dream.";
  }
};
