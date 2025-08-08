import { CreateContextDto } from "src/context/dto/create-context.dto";
import { getOpenAI } from "../clients/initialAIContext";
import filterApi from "../utils/filterApi";

export async function callDeepSeekPrompt(createContextDto: CreateContextDto) {
  const ai = getOpenAI();
  let apiToUse = filterApi(createContextDto.prompt);

  return apiToUse;
  const completion = await ai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an API bot. Use the provided functions to answer questions.",
      },
      {
        role: "user",
        content: createContextDto.prompt,
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "getWeather",
          description: "Retorna o clima atual de uma cidade",
          parameters: {
            type: "object",
            properties: {
              location: { type: "string" },
            },
            required: ["location"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "buscarUsuarioPorEmail",
          description: "Retorna dados de um usuário pelo e-mail",
          parameters: {
            type: "object",
            properties: {
              email: { type: "string", format: "email" },
            },
            required: ["email"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "buscarUsuarioPorEmail",
          description:
            "Retorna os dados de um usuário buscando pelo e-mail fornecido.",
          parameters: {
            type: "object",
            properties: {
              email: {
                type: "string",
                format: "email",
                description: "O e-mail do usuário a ser buscado.",
              },
            },
            required: ["email"],
          },
        },
      },
    ],
    model: "deepseek-chat",
    max_tokens: 500,
  });

  console.log(
    completion.choices[0].message,
    "completion.choices[0].message.content"
  );

  return completion.choices[0].message;
}
