"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateResponse_1 = require("../utils/generateResponse");
exports.default = ({ strapi }) => ({
    async index(ctx) {
        const { title, content } = ctx.request.body;
        const titleData = title ? `title = ${title} and ` : "";
        const getAiConfig = await strapi
            .query("plugin::excerpt-and-seo-generator.excerpt-seo-content-type")
            .findOne();
        const selectPrompt = (getAiConfig === null || getAiConfig === void 0 ? void 0 : getAiConfig.seoPrompt)
            ? `${getAiConfig === null || getAiConfig === void 0 ? void 0 : getAiConfig.seoPrompt} from ${content} and ${titleData} return only in JSON format`
            : `Generate an SEO metadata description maximum 160 character's long from ${content} and extract keywords from ${titleData}; ensure the description does not exceed the character limit; return all as one JSON format with attribute names description and keywords. `;
        const result = await (0, generateResponse_1.generateResponse)(selectPrompt);
        const response = {
            result: result,
        };
        ctx.send(JSON.stringify(response));
    },
});
