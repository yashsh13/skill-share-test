
// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export async function findRelevantTag(prompt) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: `here is the prompt given by the user : ${prompt} and i want you to return only one relevant tag for this prompt from this list : ["web development","mechanical","cooking","coding","art","education","electronics","gaming","sports"]. just return the output as a string of one word no other text or anything else.`,
//   });
//   console.log(response.text);
//   const text = typeof response.text === "string" ? response.text.trim().toLowerCase() : "others";
//   return (text || "").trim();
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function findRelevantTag(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const { response } = await model.generateContent(
    `here is the prompt given by the user : ${prompt} and i want you to return only one relevant tag for this prompt from this list : ["web development","mechanical","cooking","coding","art","education","electronics","gaming","sports"]. just return the output as a string of one word no other text or anything else.`
  );
  return response.text().trim();
}