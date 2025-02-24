import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";
import { createClient } from "pexels";

dotenv.config();
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

const client = createClient(process.env.PEXELS_API_KEY);
export const getPexelsImage = async (query) => {
  try {
    const response = await client.photos.search({ query, per_page: 1 });
    return response.photos[0].src.original;
  } catch (error) {
    console.error("Error fetching Pexels image:", error.message);
    return null;
  }
};

export const getAttractions = async (destination, tripType) => {
  const prompt = `Generate a JSON object with an "attractions" field containing an array of tourist attractions in ${destination} for a ${tripType} trip. Each attraction should have "name", "description", and "coordinates" (latitude and longitude).`;

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

    if (response?.message?.content) {
      return response.message.content;
    } else {
      throw new Error("Invalid response structure or no content found.");
    }
  } catch (error) {
    console.error("Error calling Cohere API:", error);
    throw new Error("Failed to fetch attractions.");
  }
};
