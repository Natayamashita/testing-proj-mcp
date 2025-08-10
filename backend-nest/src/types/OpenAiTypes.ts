type JSONSchemaType = "string" | "number" | "boolean" | "object" | "array";

export type OpenAIFunctionSchema = {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: FunctionParameters;
  };
};

interface FunctionParameters {
  type: "object";
  properties: Record<string, { type: JSONSchemaType; description: string }>;
  required: string[];
};
