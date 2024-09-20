import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    console.log(">>> log request body server");
    
    const myEnvVariable =  'defaultValue';
    ctx.body = strapi
      .plugin('generate-excerpt')
      .service('myService')
      .getWelcomeMessage();
      ctx.body = {
        myEnvVariable,
      };
  },
});
