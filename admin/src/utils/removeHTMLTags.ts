export const removeHTMLTags = (content: string) => {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
}