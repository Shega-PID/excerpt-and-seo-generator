import { request } from "@strapi/helper-plugin";
 
const AiGenerateRequest = {
  generateExcerpt: async (
    content: string,
  ) => {    
    return await request(
      `/generate-excerpt/excerpt-generator`,
      {
        method: "POST",
        body: { content },
      }
    );
  },
  generateSeo: async (
    content: string,
  ) => {    
    return await request(
      `/generate-excerpt/seo-generator`,
      {
        method: "POST",
        body: { content },
      }
    );
  },
 
};
 
export default AiGenerateRequest;