import React, { useEffect, useState } from "react";
import {
  TextInput,
  Textarea,
  Select,
  Option,
  Button,
  Stack,
  Typography,
  Box,
} from "@strapi/design-system";
import { useIntl } from "react-intl";
import AiGenerateRequest from "../../api/excerpt-api";
import { useNotification } from "@strapi/helper-plugin";

const MyForm = () => {
  const [product, setProduct] = useState("");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [excerptPrompt, setExcerptPrompt] = useState("");
  const [seoPrompt, setSeoPrompt] = useState("");
  const [errorState, setErrorState] = useState({
    product: "",
    model: "",
    apiKey: "",
  });
  const { formatMessage } = useIntl();
  const showNotification = useNotification();

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newErrorState = { ...errorState };

    // Basic validation
    if (!product.trim()) {
      newErrorState.product = "Product is required.";
      isValid = false;
    }
    if (!model.trim()) {
      newErrorState.model = "Model is required.";
      isValid = false;
    }
    if (!apiKey.trim()) {
      newErrorState.apiKey = "API Key is required.";
      isValid = false;
    }

    setErrorState(newErrorState);

    if (!isValid) {
      console.error("Form is invalid:", newErrorState);
      return;
    }
    try {
      await AiGenerateRequest.excerptSeo(
        product,
        model,
        apiKey,
        excerptPrompt,
        seoPrompt
      );
      showNotification({
        message: "Configuration Successful",
        title: "Success",
        type: "success",
      });
    } catch (error) {
      showNotification({
        message: "Configuration Failed",
        title: "Error",
        type: "warning",
      });
      console.error("Error saving form:", error);
    }
  };
  useEffect(() => {
    // Fetch the existing entry
    AiGenerateRequest.getExcerptSeo()
      .then((data) => {
        setProduct(data?.product);
        setModel(data?.model);
        setApiKey(data?.apiKey);
        setExcerptPrompt(data?.excerptPrompt);
        setSeoPrompt(data?.seoPrompt);
      })
      .catch((err) => console.error("Error fetching entry:", err));
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Box padding={4}>
        <Typography variant="beta" center as="h2">
          Excerpt And SEO Generator
        </Typography>
        <br />
        <Stack spacing={4}>
          {/* Dropdown */}
          <Select
            label={formatMessage({
              id: "select.product",
              defaultMessage: "Product",
            })}
            name="dropdownValue"
            required
            error={errorState?.product}
            value={product}
            onChange={(e: React.SetStateAction<string>) => {
              setProduct(e);
              if (e) {
                setErrorState((prevError) => ({
                  ...prevError,
                  product: "",
                }));
              }
            }}
          >
            <Option value="chatgpt">
              {formatMessage({ id: "gpt", defaultMessage: "Chatgpt" })}
            </Option>
            <Option value="gemini">
              {formatMessage({ id: "gemini", defaultMessage: "Gemini" })}
            </Option>
            <Option value="groq">
              {formatMessage({ id: "groq", defaultMessage: "Groq" })}
            </Option>
          </Select>

          {/* Key */}
          <TextInput
            label={formatMessage({
              id: "input.model",
              defaultMessage: "Model",
            })}
            name="model"
            value={model}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setModel(e.target.value);
              if (e.target.value) {
                setErrorState((prevError) => ({
                  ...prevError,
                  model: "",
                }));
              }
            }}
            required
            error={errorState?.model} // Pass the error message if it exists
          />
          {/* Key */}
          <TextInput
            label={formatMessage({
              id: "input.apiKey",
              defaultMessage: "Api Key",
            })}
            name="apiKey"
            value={apiKey}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setApiKey(e.target.value);
              if (e.target.value) {
                setErrorState((prevError) => ({
                  ...prevError,
                  apiKey: "",
                }));
              }
            }}
            required
            error={errorState?.apiKey}
          />
          {/* Excerpt Prompt */}
          <Textarea
            label={formatMessage({
              id: "input.excerptPrompt",
              defaultMessage: "Excerpt Prompt",
            })}
            name="excerptPrompt"
            value={excerptPrompt}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setExcerptPrompt(e.target.value);
            }}
            rows={4}
          />
          {/* SEO Prompt */}
          <Textarea
            label={formatMessage({
              id: "input.seoPrompt",
              defaultMessage: "SEO Prompt",
            })}
            name="seoPrompt"
            value={seoPrompt}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setSeoPrompt(e.target.value);
            }}
            rows={4}
          />

          {/* Submit Button */}
          <div className="w-96">
            <Button type="submit" variant="primary">
              {formatMessage({ id: "form.submit", defaultMessage: "Submit" })}
            </Button>
          </div>
        </Stack>
      </Box>
    </form>
  );
};

export default MyForm;
