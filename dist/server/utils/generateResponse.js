"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const generative_ai_1 = require("@google/generative-ai");
const openai_1 = require("openai");
const generateResponse = async (selectPrompt) => {
    const getAiConfig = await strapi
        .query("plugin::excerpt-and-seo-generator.excerpt-seo-content-type")
        .findOne();
    const data = {
        selectPrompt,
        model: getAiConfig === null || getAiConfig === void 0 ? void 0 : getAiConfig.model,
        apiKey: getAiConfig === null || getAiConfig === void 0 ? void 0 : getAiConfig.apiKey,
        url: getAiConfig === null || getAiConfig === void 0 ? void 0 : getAiConfig.url,
        deployment: getAiConfig === null || getAiConfig === void 0 ? void 0 : getAiConfig.deployment
    };
    let result;
    switch (getAiConfig === null || getAiConfig === void 0 ? void 0 : getAiConfig.product) {
        case "chatgpt":
            result = await GenerateUsingChatGPT(data);
            break;
        case "gemini":
            result = await GenerateUsingGemini(data);
            break;
        case "groq":
            result = await GenerateUsingGroq(data);
            break;
        case "azure-chatgpt":
            result = await GenerateUsingAzureAI(data);
            break;
        default:
            console.error("Invalid product selected.");
    }
    return result;
};
exports.generateResponse = generateResponse;
const GenerateUsingChatGPT = async (data) => {
    var _a, _b;
    const openai = new openai_1.OpenAI({
        apiKey: data === null || data === void 0 ? void 0 : data.apiKey, // Pass the OpenAI API key
    });
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: (data === null || data === void 0 ? void 0 : data.model) || "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: (data === null || data === void 0 ? void 0 : data.selectPrompt) || "",
                },
            ],
        });
        const response = (_a = chatCompletion === null || chatCompletion === void 0 ? void 0 : chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message;
        console.log(">>> log ChatGPT data", response);
        return response;
    }
    catch (error) {
        console.error("Error with ChatGPTs:", ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message);
        throw new Error("Failed to generate response from ChatGPT.");
    }
};
const GenerateUsingGemini = async (data) => {
    var _a, _b;
    try {
        const genAI = new generative_ai_1.GoogleGenerativeAI(data === null || data === void 0 ? void 0 : data.apiKey);
        const model = genAI.getGenerativeModel({ model: data === null || data === void 0 ? void 0 : data.model });
        const result = await model.generateContent(data === null || data === void 0 ? void 0 : data.selectPrompt);
        const response = (_a = result === null || result === void 0 ? void 0 : result.response) === null || _a === void 0 ? void 0 : _a.text();
        return response;
    }
    catch (error) {
        console.error("Error with Gemini:", ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message);
        throw new Error("Failed to generate response from Gemini.");
    }
};
const GenerateUsingGroq = async (data) => {
    var _a, _b, _c;
    try {
        const groq = new groq_sdk_1.default({
            apiKey: data === null || data === void 0 ? void 0 : data.apiKey,
        });
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: (data === null || data === void 0 ? void 0 : data.selectPrompt) || "",
                },
            ],
            model: (data === null || data === void 0 ? void 0 : data.model) || "llama3-8b-8192",
        });
        const response = (_b = (_a = chatCompletion === null || chatCompletion === void 0 ? void 0 : chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
        return response;
    }
    catch (error) {
        console.error("Error with Groq:", ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || error.message);
        throw new Error("Failed to generate response from Groq.");
    }
};
const GenerateUsingAzureAI = async (data) => {
    var _a, _b;
    const openai = new openai_1.AzureOpenAI({
        endpoint: data === null || data === void 0 ? void 0 : data.url,
        apiKey: data === null || data === void 0 ? void 0 : data.apiKey,
        apiVersion: data === null || data === void 0 ? void 0 : data.model,
        deployment: data === null || data === void 0 ? void 0 : data.deployment,
    });
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "",
            messages: [
                {
                    role: "user",
                    content: (data === null || data === void 0 ? void 0 : data.selectPrompt) || "",
                },
            ],
        });
        const response = (_a = chatCompletion === null || chatCompletion === void 0 ? void 0 : chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message;
        return response === null || response === void 0 ? void 0 : response.content;
    }
    catch (error) {
        console.error("Error with ChatGPT:", ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message, data);
        throw new Error("Failed to generate response from ChatGPT.");
    }
};
