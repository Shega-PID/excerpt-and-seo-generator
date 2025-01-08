import { Button } from '@strapi/design-system/Button';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { useState } from 'react';
import { useNotification } from "@strapi/helper-plugin";
import { Magic } from '@strapi/icons';
import { removeHTMLTags } from '../../utils/removeHTMLTags';
import AiGenerateRequest from '../../api/excerpt-api';
import extractAndConvertJson from '../../utils/extractAndConvertJson';
const ExcerptButton = () => {
    const { modifiedData, onChange } = useCMEditViewDataManager();
    const showNotification = useNotification();
    const [loadingExcerpt, setLoadingExcerpt] = useState(false);
    const handleGenerateExcerpt = async () => {
        if (!modifiedData?.content?.body) {
            showNotification({ message: "Content must be provided", title: "Error", type: 'warning' });
        } else {
            setLoadingExcerpt(true)
            const cleanContent = removeHTMLTags(modifiedData?.content?.body)
            const response = await AiGenerateRequest.generateExcerpt(cleanContent)
            const { excerpt } = extractAndConvertJson(response?.result || "");
            if (!response.data) {
                setLoadingExcerpt(false)
            }
            onChange({
                target: { name: "excerpt", value: excerpt },
            });
            showNotification({ message: "Excerpt generated", title: "Success", type: 'success' });
            setLoadingExcerpt(false)
        }
    };
  return (
    <Button onClick={handleGenerateExcerpt} fullWidth={true} loading={loadingExcerpt} variant="primary" >
                Generate Excerpt <Magic />
    </Button>
  )
}

export default ExcerptButton