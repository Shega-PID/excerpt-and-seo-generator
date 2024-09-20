"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: 'POST',
        path: '/excerpt-generator',
        handler: 'excerptGenerator.index',
        config: {
            policies: [],
            auth: false,
            middleware: []
        },
    },
    {
        method: 'POST',
        path: '/seo-generator',
        handler: 'seoGenerator.index',
        config: {
            policies: [],
            auth: false,
            middleware: []
        },
    },
];
