import { Strapi } from "@strapi/strapi";
export default ({ strapi }: { strapi: Strapi }) => ({
  async create(ctx) {
    const request = ctx?.request?.body;
    const pluginName =
      "plugin::excerpt-and-seo-generator.excerpt-seo-content-type";
    const getAiConfig = await strapi.query(pluginName).findOne();
    if (!getAiConfig) {
      const newAiConfig = await strapi.query(pluginName).create({
        data: {
          product: request?.product, // Assuming a relation exists
          model: request?.model, // Assuming a relation exists
          apiKey: request?.apiKey,
          excerptPrompt: request?.excerptPrompt,
          seoPrompt: request?.seoPrompt,
        },
      });
      return newAiConfig;
    } else {
      // If getAiConfig exists, update the existing entry
      const updatedAiConfig = await strapi.query(pluginName).update({
        where: { id: getAiConfig.id }, // Assuming you have the id from the existing config
        data: {
          product: request?.product ?? getAiConfig.product, // Use the existing value if not provided
          model: request?.model ?? getAiConfig.model,
          apiKey: request?.apiKey ?? getAiConfig.apiKey,
          excerptPrompt: request?.excerptPrompt ?? getAiConfig.excerptPrompt,
          seoPrompt: request?.seoPrompt ?? getAiConfig.seoPrompt,
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
