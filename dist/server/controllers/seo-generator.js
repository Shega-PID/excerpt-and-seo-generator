"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
exports.default = ({ strapi }) => ({
    async index(ctx) {
        var _a;
        const { title, content } = ctx.request.body;
        const generateResponse = async () => {
            const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GOOGLE_GENERATE_AI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
            const titleData = title ? `title = ${title} and ` : '';
            const result = await model.generateContent(`Generate an SEO metadata description maximum 160 character's long from ${content} and extract keywords from ${titleData}; ensure the description does not exceed the character limit; return only in JSON format.`);
            return result;
        };
        const result = await generateResponse();
        const response = {
            result: (_a = result === null || result === void 0 ? void 0 : result.response) === null || _a === void 0 ? void 0 : _a.text()
        };
        ctx.send(JSON.stringify(response));
    },
});
function removeHTMLTags(content) {
    throw new Error('Function not implemented.');
}
