export const extractAndConvertJson = (jsonString: string) => {
    // Regular expression to match a JSON object within the string
    const jsonObjectPattern = /{[^]*}/;

    // Find the JSON object part in the string
    const match = jsonString.match(jsonObjectPattern);

    if (match) {
        const jsonObjectString = match[0];

        try {
            // Parse the JSON object string to a JavaScript object
            const jsonObject = JSON.parse(jsonObjectString);
            return jsonObject;
        } catch (e) {
            console.error("Error parsing JSON:", e);
            return null;
        }
    } else {
        console.error("No JSON object found in the string.");
        return null;
    }
}
export default extractAndConvertJson