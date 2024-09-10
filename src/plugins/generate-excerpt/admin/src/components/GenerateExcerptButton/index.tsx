import { Button } from '@strapi/design-system/Button';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from 'react';
import { useNotification } from "@strapi/helper-plugin";
import { AccessibleIcon } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { Magic } from '@strapi/icons';
const GenerateExcerptButton = () => {
    const { modifiedData, onChange } = useCMEditViewDataManager();
    const showNotification = useNotification();
    const [loading, setLoading] = useState(false);
    const handleGenerateExcerpt = async () => {
        if (!modifiedData?.title && !modifiedData?.description) {
            showNotification({ message: "Title or Description must be provided", title: "Error", type: 'warning' });
        } else {
            setLoading(true)
            const genAI = new GoogleGenerativeAI("AIzaSyBiSdGyjS9fNuTkBFvlArT9FrprQGVSmfs");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `Write a 500 character excerpt from title = ${modifiedData?.title} and description = ${modifiedData?.description} and remove the title in response.`;
            const result = await model.generateContent(prompt);
            onChange({
                target: { name: "excerpt", value: result.response.text() },
            });
            setLoading(false)
        }
    };
    return (
        <Button onClick={handleGenerateExcerpt} fullWidth={true} loading={loading} variant="primary" >
            Generate Excerpt <Magic />
        </Button>
    );
};

export default GenerateExcerptButton;
