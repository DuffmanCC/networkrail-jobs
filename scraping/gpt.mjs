import Ajv from "ajv";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import schema from "./schema.mjs";

const envPath = path.join(process.cwd(), ".env");

dotenv.config({ path: envPath });

const CHAT_GPT_DESCRIPTION_PROMPT = `
Giving you a JSON object with HTML from a page with a job vacancy, give me the key points about the info formatted in a JSON object.
`;

export async function formatTextWithChatGpt({
  textToFormat,
  maxTokens = 1000,
}) {
  const apiKey = process.env.OPEN_AI_API_KEY;
  const primerPrompt = CHAT_GPT_DESCRIPTION_PROMPT;

  const openai = new OpenAI({ apiKey });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "user",
          content: primerPrompt,
        },
        {
          role: "user",
          content: textToFormat,
        },
      ],
      temperature: 1,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      functions: [
        {
          name: "getContent",
          parameters: schema,
        },
      ],
      function_call: { name: "getContent" },
    });

    const jsonString = response.choices[0].message.function_call?.arguments;

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(JSON.parse(jsonString));

    if (!valid) {
      console.log("❌ Not valid JSON Schema", validate.errors);
      return false;
    }

    return jsonString;
  } catch (error) {
    console.log(`❌ Error formatting text with Chat GPT: ${error}`);
    return false;
  }
}
