import { GoogleGenerativeAI } from '@google/generative-ai';
import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
    async index(ctx) {
        const { title, content } = ctx.request.body

        const generateResponse = async () => {
            const genAI = new GoogleGenerativeAI(process.env.GOOGLEGENERATEAIAPIKEY as string);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const titleData = title ? `title = ${title} and ` : ''
        
            const result = await model.generateContent(`generate seo metadata title 50 character long, Description 160 character long and keywords from ${titleData} content = ${content}. return only as json.`);
            return result
        }
        const result = await generateResponse()
        const response = {
            result: result?.response?.text()
        }
        ctx.send(JSON.stringify(response))
    },
});

function removeHTMLTags(content: any) {
    throw new Error('Function not implemented.');
}
