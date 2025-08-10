import { CreateContextDto } from "src/context/dto/create-context.dto";
import { getOpenAI } from "../clients/initialAIContext";
import filterApi from "../utils/filterApi";
import type { ChatCompletionTool } from "openai/resources/chat/completions";

export async function callDeepSeekPrompt(createContextDto: CreateContextDto) {
  const ai = getOpenAI();
  let apiToUse = filterApi(createContextDto.prompt);

  if (apiToUse == "not found") throw Error('not found');

  const tools: ChatCompletionTool[] = apiToUse.flat();
  console.log(tools,`toolstools`)
  const completion = await ai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          `You are an API bot. Use the provided functions to answer questions. 
          If any required params is missing return 'invalid output' and which required params is missing.`
      },
      {
        role: "user",
        content: createContextDto.prompt,
      },
    ],
    tools,
    model: "deepseek-chat",
    max_tokens: 500,
  });

  return completion.choices[0].message;
}
