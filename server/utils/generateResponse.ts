import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GOOGLE_GENERATE_AI_API_KEY as string,
});
export const generateResponse = async (selectPrompt?: string) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: selectPrompt || "",
      },
    ],
    model: "llama3-8b-8192",
  });
  return chatCompletion?.choices[0]?.message?.content;
};
