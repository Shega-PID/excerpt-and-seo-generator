"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
exports.default = ({ strapi }) => ({
    async index(ctx) {
        var _a;
        const { content } = ctx.request.body;
        const generateResponse = async () => {
            const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GOOGLE_GENERATE_AI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
            const result = await model.generateContent(`Generate an excerpt from the provided content (${content}) with a maximum length of 190 characters. Ensure the excerpt does not exceed limit of 190 charachter. If the description exceeds 190 characters, truncate it to fit. Do not include the title in the response.`);
            return result;
        };
        const result = await generateResponse();
        const response = {
            result: (_a = result === null || result === void 0 ? void 0 : result.response) === null || _a === void 0 ? void 0 : _a.text()
        };
        ctx.send(JSON.stringify(response));
    },
});
