"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ValidationError } = require('@strapi/utils').errors;
exports.default = {
    default: {
        contentTypes: [],
    },
    mySetting: process.env.MY_CUSTOM_PLUGIN_SETTING || 'defaultValue',
};
