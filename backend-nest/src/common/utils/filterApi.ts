import { normalize } from "./normalize";
import { systemApis } from "./workFlowDefinitions";
import type { ChatCompletionTool } from "openai/resources/chat/completions";

export default function (prompt: string): ChatCompletionTool[] | 'not found' {
  const keysApis = Object.keys(systemApis);
  const findApiToUses = keysApis.filter((opt) =>
    normalize(prompt).includes(normalize(opt))
  );

  if (!findApiToUses.length) return 'not found';

  // systemApis[option] é ChatCompletionTool[]
  return findApiToUses.map((option) => systemApis[option]).flat();
}
