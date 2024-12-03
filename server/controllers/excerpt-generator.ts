import { Strapi } from "@strapi/strapi";
import { generateResponse } from "../utils/generateResponse";
export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    const { content } = ctx.request.body;
    const selectPrompt = process.env.GENERATE_EXCERPT_PROMPT
      ? `${process.env.GENERATE_EXCERPT_PROMPT} from ${content}`
      : `Generate a maximum 200 character's long excerpt from ${content};ensure the excerpt does not exceed the character limit; return all as one JSON format with attribute name excerpt.`;
    const result = await generateResponse(selectPrompt);
    const response = {
      result: result,
    };
    ctx.send(JSON.stringify(response));
  },
});
