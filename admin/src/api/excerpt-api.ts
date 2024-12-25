import { request } from "@strapi/helper-plugin";

const AiGenerateRequest = {
  generateExcerpt: async (content: string) => {
    return await request(`/excerpt-and-seo-generator/excerpt-generator`, {
      method: "POST",
      body: { content },
    });
  },
  generateSeo: async (content: string, title?: string) => {
    return await request(`/excerpt-and-seo-generator/seo-generator`, {
      method: "POST",
      body: { content, title },
    });
  },
  excerptSeo: async (
    product: string,
    model: string,
    apiKey: string,
    excerptPrompt?: string,
    seoPrompt?: string
  ) => {
    return await request(`/excerpt-and-seo-generator/excerpt-seo`, {
      method: "POST",
      body: { product, model, apiKey, excerptPrompt, seoPrompt },
    });
  },
  getExcerptSeo: async () => {
    return await request(`/excerpt-and-seo-generator/excerpt-seo`, {
      method: "GET",
    });
  },
};

export default AiGenerateRequest;
