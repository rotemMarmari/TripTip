import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export const getTripTips = async (destination, transportation) => {
  const prompt = `Generate a JSON object with an "attractions" field containing an array of tourist attractions in ${destination}, designed for a traveler using ${transportation}. Each attraction should have "name", "description", and "coordinates" (latitude and longitude).`;

  try {
    const response = await cohere.chat({
      model: "command-r-plus-08-2024",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_object",
        schema: {
          type: "object",
          properties: {
            attractions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  coordinates: {
                    type: "object",
                    properties: {
                      latitude: { type: "number" },
                      longitude: { type: "number" },
                    },
                    required: ["latitude", "longitude"],
                  },
                },
                required: ["name", "description", "coordinates"],
              },
            },
          },
          required: ["attractions"],
        },
      },
    });

    console.log("Cohere API response:", JSON.stringify(response, null, 2));

    if (response?.message?.content) {
      return response.message.content; // The content should already be a valid JSON object
    } else {
      throw new Error("Invalid response structure or no content found.");
    }
  } catch (error) {
    console.error("Error calling Cohere API:", error);
    throw new Error("Failed to fetch trip tips.");
  }
};
