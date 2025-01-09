import { Strapi } from "@strapi/strapi";
import { generateResponse } from "../utils/generateResponse";
export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    const { content } = ctx.request.body;
    const getAiConfig = await strapi
    .query("plugin::excerpt-and-seo-generator.excerpt-seo-content-type")
    .findOne();
    const selectPrompt = getAiConfig?.excerptPrompt
      ? `${getAiConfig?.excerptPrompt} from ${content}`
      : `Generate a maximum 200 character's long excerpt from ${content};ensure the excerpt does not exceed the character limit; return all as one JSON format with attribute name excerpt.`;
    const result = await generateResponse(selectPrompt);
    const response = {
      result: result,
    };    
    ctx.send(JSON.stringify(response));
  },
});
