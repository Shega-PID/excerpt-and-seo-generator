"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateResponse_1 = require("../utils/generateResponse");
exports.default = ({ strapi }) => ({
    async index(ctx) {
        const { content } = ctx.request.body;
        const getAiConfig = await strapi
            .query("plugin::excerpt-and-seo-generator.excerpt-seo-content-type")
            .findOne();
        const selectPrompt = (getAiConfig === null || getAiConfig === void 0 ? void 0 : getAiConfig.excerptPrompt)
            ? `${getAiConfig === null || getAiConfig === void 0 ? void 0 : getAiConfig.excerptPrompt} from ${content}`
            : `Generate a maximum 200 character's long excerpt from ${content};ensure the excerpt does not exceed the character limit; return all as one JSON format with attribute name excerpt.`;
        const result = await (0, generateResponse_1.generateResponse)(selectPrompt);
        const response = {
            result: result,
        };
        ctx.send(JSON.stringify(response));
    },
});
