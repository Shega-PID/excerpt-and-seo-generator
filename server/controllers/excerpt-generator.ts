import { GoogleGenerativeAI } from '@google/generative-ai';
import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
    async index(ctx) {
        const { content } = ctx.request.body
        const selectPrompt =  process.env.GENERATE_EXCERPT_PROMPT ? `${process.env.GENERATE_EXCERPT_PROMPT} from ${content}` : `Write a 200 character excerpt from ${content} and remove the title in response.`
        const generateResponse = async () => {
            const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATE_AI_API_KEY as string);
            const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
            const result = await model.generateContent(selectPrompt);
            return result
        }
        const result = await generateResponse()
        const response = {
            result: result?.response?.text()
        }
        ctx.send(JSON.stringify(response))
    },
});