import { GoogleGenerativeAI } from '@google/generative-ai';
import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
    async index(ctx) {
        const { title, content } = ctx.request.body
        const titleData = title ? `title = ${title} and ` : ''
        const selectPrompt =  process.env.GENERATE_SEO_PROMPT ? `${process.env.GENERATE_SEO_PROMPT} from ${content} and ${titleData} return only in JSON format` : `Generate an SEO metadata description maximum 160 character's long from ${content} and extract keywords from ${titleData}; ensure the description does not exceed the character limit; return only in JSON format.`

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
