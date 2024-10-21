"use strict";
// @ts-ignore
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const excerpt_generator_js_1 = __importDefault(require("./excerpt-generator.js"));
const seo_generator_js_1 = __importDefault(require("./seo-generator.js"));
exports.default = {
    excerptGenerator: excerpt_generator_js_1.default,
    seoGenerator: seo_generator_js_1.default
};
