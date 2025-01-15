import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export const getTripTips = async (destination, transportation) => {
  const prompt = `You are a tour guide, and your mission is to create a trip to a tourist who is traveling in ${destination} by ${transportation}. Mention 3 attractions they should visit. use 150 words max`;

  try {
    const response = await cohere.generate({
      model: "command-r-plus-08-2024",
      prompt,
    });

    console.log("Cohere API response:", JSON.stringify(response, null, 2));

    if (response && response.generations && response.generations.length > 0) {
      // Extract the text content from the first generation
      return response.generations[0].text.trim();
    } else {
      throw new Error("Invalid response structure or no content found.");
    }
  } catch (error) {
    console.error("Error calling Cohere API:", error);
    throw new Error("Failed to fetch trip tips.");
  }
};
