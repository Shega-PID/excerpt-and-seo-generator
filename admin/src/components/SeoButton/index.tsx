import { Button } from "@strapi/design-system/Button";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import { useState } from "react";
import { useNotification } from "@strapi/helper-plugin";
import { Magic } from "@strapi/icons";
import extractAndConvertJson from "../../utils/extractAndConvertJson";
import AiGenerateRequest from "../../api/excerpt-api";
import { removeHTMLTags } from "../../utils/removeHTMLTags";
const SeoButton = () => {
  const { modifiedData, onChange } = useCMEditViewDataManager();
  const showNotification = useNotification();
  const [loadingSeo, setLoadingSeo] = useState(false);

  const handleGenerateSeo = async () => {
    if (!modifiedData?.title || !modifiedData?.content?.body) {
      showNotification({
        message: "Title or Content must be provided",
        title: "Error",
        type: "warning",
      });
    } else {
      const cleanContent = removeHTMLTags(modifiedData?.content?.body);
      setLoadingSeo(true);
      const response = await AiGenerateRequest.generateSeo(
        cleanContent,
        modifiedData?.title
      );
      if (!response.data) {
        setLoadingSeo(false);
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
      showNotification({
        message: "SEO generated",
        title: "Success",
        type: "success",
      });
      setLoadingSeo(false);
    }
  };
  return (
    <Button
      onClick={handleGenerateSeo}
      fullWidth={true}
      loading={loadingSeo}
      variant="primary"
    >
      Generate Seo <Magic />
    </Button>
  );
};

export default SeoButton;
