"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    index(ctx) {
        console.log(">>> log request body server");
        const myEnvVariable = 'defaultValue';
        ctx.body = strapi
            .plugin('generate-excerpt')
            .service('myService')
            .getWelcomeMessage();
        ctx.body = {
            myEnvVariable,
        };
    },
});
