"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GOOGLE_GENERATE_AI_API_KEY,
});
const generateResponse = async (selectPrompt) => {
    var _a, _b;
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: selectPrompt || "",
            },
        ],
        model: "llama3-8b-8192",
    });
    return (_b = (_a = chatCompletion === null || chatCompletion === void 0 ? void 0 : chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
};
exports.generateResponse = generateResponse;
