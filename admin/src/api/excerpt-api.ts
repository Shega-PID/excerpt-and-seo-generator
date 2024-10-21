import { request } from "@strapi/helper-plugin";
 
const AiGenerateRequest = {
  generateExcerpt: async (
    content: string,
  ) => {    
    return await request(
      `/excerpt-and-seo-generator/excerpt-generator`,
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
      `/excerpt-and-seo-generator/seo-generator`,
      {
        method: "POST",
        body: { content },
      }
    );
  },
 
};
 
export default AiGenerateRequest;