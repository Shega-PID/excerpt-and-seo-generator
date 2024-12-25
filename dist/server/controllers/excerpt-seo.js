"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async create(ctx) {
        var _a, _b, _c, _d, _e, _f;
        const request = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.request) === null || _a === void 0 ? void 0 : _a.body;
        const pluginName = "plugin::excerpt-and-seo-generator.excerpt-seo-content-type";
        const getAiConfig = await strapi.query(pluginName).findOne();
        if (!getAiConfig) {
            const newAiConfig = await strapi.query(pluginName).create({
                data: {
                    product: request === null || request === void 0 ? void 0 : request.product,
                    model: request === null || request === void 0 ? void 0 : request.model,
                    apiKey: request === null || request === void 0 ? void 0 : request.apiKey,
                    excerptPrompt: request === null || request === void 0 ? void 0 : request.excerptPrompt,
                    seoPrompt: request === null || request === void 0 ? void 0 : request.seoPrompt,
                },
            });
            return newAiConfig;
        }
        else {
            // If getAiConfig exists, update the existing entry
            const updatedAiConfig = await strapi.query(pluginName).update({
                where: { id: getAiConfig.id },
                data: {
                    product: (_b = request === null || request === void 0 ? void 0 : request.product) !== null && _b !== void 0 ? _b : getAiConfig.product,
                    model: (_c = request === null || request === void 0 ? void 0 : request.model) !== null && _c !== void 0 ? _c : getAiConfig.model,
                    apiKey: (_d = request === null || request === void 0 ? void 0 : request.apiKey) !== null && _d !== void 0 ? _d : getAiConfig.apiKey,
                    excerptPrompt: (_e = request === null || request === void 0 ? void 0 : request.excerptPrompt) !== null && _e !== void 0 ? _e : getAiConfig.excerptPrompt,
                    seoPrompt: (_f = request === null || request === void 0 ? void 0 : request.seoPrompt) !== null && _f !== void 0 ? _f : getAiConfig.seoPrompt,
                },
            });
            return updatedAiConfig;
        }
    },
    async get(ctx) {
        const getAiConfig = await strapi
            .query("plugin::excerpt-and-seo-generator.excerpt-seo-content-type")
            .findOne();
        return getAiConfig;
    },
});
