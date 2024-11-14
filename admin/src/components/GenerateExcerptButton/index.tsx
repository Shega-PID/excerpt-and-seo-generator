import { Button } from '@strapi/design-system/Button';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from 'react';
import { useNotification } from "@strapi/helper-plugin";
import { Magic } from '@strapi/icons';
import extractAndConvertJson from '../../utils/extractAndConvertJson';
import AiGenerateRequest from '../../api/excerpt-api';
import { removeHTMLTags } from '../../utils/removeHTMLTags';
const GenerateExcerptButton = () => {
    const { modifiedData, onChange } = useCMEditViewDataManager();
    const showNotification = useNotification();
    const [loadingExcerpt, setLoadingExcerpt] = useState(false);
    const [loadingSeo, setLoadingSeo] = useState(false);
    const handleGenerateExcerpt = async () => {
        if (!modifiedData?.content?.body) {
            showNotification({ message: "Content must be provided", title: "Error", type: 'warning' });
        } else {
            setLoadingExcerpt(true)
            const cleanContent = removeHTMLTags(modifiedData?.content?.body)
            const response = await AiGenerateRequest.generateExcerpt(cleanContent)
            if (!response.data) {
                setLoadingExcerpt(false)
            }
            onChange({
                target: { name: "excerpt", value: response.result },
            });
            showNotification({ message: "Excerpt generated", title: "Success", type: 'success' });
            setLoadingExcerpt(false)
        }
    };
    const handleGenerateSeo = async () => {
        if (!modifiedData?.title || !modifiedData?.content?.body) {
            showNotification({ message: "Title or Content must be provided", title: "Error", type: 'warning' });
        } else {
            const cleanContent = removeHTMLTags(modifiedData?.content?.body)
            setLoadingSeo(true)
            const response = await AiGenerateRequest.generateSeo(cleanContent,modifiedData?.title)
            if (!response.data) {
                setLoadingSeo(false)
            }
            const { description, keywords } = extractAndConvertJson(response?.result);
            onChange({
                target: { name: "seo.metaTitle", value: modifiedData?.title },
            });
            onChange({
                target: { name: "seo.metaDescription", value: description },
            });
            onChange({
                target: { name: "seo.keywords", value: keywords },
            });
            showNotification({ message: "SEO generated", title: "Success", type: 'success' });
            setLoadingSeo(false)
        }
    };
    return (
        <div>
            <Button onClick={handleGenerateExcerpt} fullWidth={true} loading={loadingExcerpt} variant="primary" >
                Generate Excerpt <Magic />
            </Button>
            <div style={{ height: "10px" }}>

            </div>
            <Button onClick={handleGenerateSeo} fullWidth={true} loading={loadingSeo} variant="primary" >
                Generate Seo <Magic />
            </Button>
        </div>

    );
};

export default GenerateExcerptButton;

