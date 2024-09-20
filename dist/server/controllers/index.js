"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const excerpt_generator_1 = __importDefault(require("./excerpt-generator"));
const seo_generator_1 = __importDefault(require("./seo-generator"));
exports.default = {
    excerptGenerator: excerpt_generator_1.default,
    seoGenerator: seo_generator_1.default
};
