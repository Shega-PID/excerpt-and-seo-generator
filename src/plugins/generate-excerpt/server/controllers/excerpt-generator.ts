import { GoogleGenerativeAI } from '@google/generative-ai';
import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
    async index(ctx) {
        const { content } = ctx.request.body

        const generateResponse = async () => {
            const genAI = new GoogleGenerativeAI(process.env.GOOGLEGENERATEAIAPIKEY as string);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(`Write a 200 character excerpt from ${content} and remove the title in response.`);
            return result
        }
        const result = await generateResponse()
        const response = {
            result: result?.response?.text()
        }
        ctx.send(JSON.stringify(response))
    },
});