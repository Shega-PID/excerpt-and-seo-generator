import { Button } from '@strapi/design-system/Button';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from 'react';
import { useNotification } from "@strapi/helper-plugin";
import { Magic } from '@strapi/icons';
import extractAndConvertJson from '../../utils/extractAndConvertJson';
import AiGenerateRequest from '../../api/excerpt-api';
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
            const response = await AiGenerateRequest.generateExcerpt(modifiedData?.content?.body)
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
            setLoadingSeo(true)
            const response = await AiGenerateRequest.generateSeo(modifiedData?.content)
            setLoadingSeo(false)
            const { metaTitle, metaDescription, keywords } = extractAndConvertJson(response?.result);
            onChange({
                target: { name: "seo.0.metaTitle", value: metaTitle },
            });
            onChange({
                target: { name: "seo.0.metaDescription", value: metaDescription },
            });
            onChange({
                target: { name: "seo.0.keywords", value: keywords },
            });
            showNotification({ message: "SEO generated", title: "Success", type: 'success' });

        }
    };
    return (
        <div>
            <Button onClick={handleGenerateExcerpt} fullWidth={true} loading={loadingExcerpt} variant="primary" >
                Generate Excerptsaa <Magic />
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

