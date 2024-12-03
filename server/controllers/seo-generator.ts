import { Strapi } from "@strapi/strapi";
import { generateResponse } from "../utils/generateResponse";
export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    const { title, content } = ctx.request.body;
    const titleData = title ? `title = ${title} and ` : "";
    const selectPrompt = process.env.GENERATE_SEO_PROMPT
      ? `${process.env.GENERATE_SEO_PROMPT} from ${content} and ${titleData} return only in JSON format`
      : `Generate an SEO metadata description maximum 160 character's long from ${content} and extract keywords from ${titleData}; ensure the description does not exceed the character limit; return all as one JSON format with attribute names description and keywords.`;
    const result = await generateResponse(selectPrompt);
    const response = {
      result: result,
    };
    ctx.send(JSON.stringify(response));
  },
});
