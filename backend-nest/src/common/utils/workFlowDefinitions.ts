import type { ChatCompletionTool } from "openai/resources/chat/completions";
import type { FunctionParameters } from "openai/resources/shared";

// Se quiser manter o nome:
export type OpenAIFunctionSchema = ChatCompletionTool;

export const systemApis: Record<string, ChatCompletionTool[]> = {
  product: [
    {
      type: "function",
      function: {
        name: "createProduct",
        description:
          "Creates a new product associated with the authenticated user.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the product to be created.",
            } as FunctionParameters,
            userId: {
              type: "string",
              description:
                "The ID of the authenticated user who is creating the product.",
            } as FunctionParameters,
          },
          required: ["name", "userId"],
        } as FunctionParameters,
      },
    },
    {
      type: "function",
      function: {
        name: "getProducts",
        description: "Returns all products (no parameters).",
        parameters: {
          type: "object",
          properties: {}, // sem parâmetros
          required: [],
          additionalProperties: false,
        } as FunctionParameters,
      },
    },
  ],
  user: [
    {
      type: "function",
      function: {
        name: "createUser",
        description: "Creates a new user.",
        parameters: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "The email of the new user.",
            } as FunctionParameters,
            password: {
              type: "string",
              description: "The user's password.",
            } as FunctionParameters,
          },
          required: ["email", "password"],
        } as FunctionParameters,
      },
    },
    {
      type: "function",
      function: {
        name: "findUserByEmail",
        description: "Returns user data by searching with the provided email.",
        parameters: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "The email of the user to be searched.",
            } as FunctionParameters,
          },
          required: ["email"],
        } as FunctionParameters,
      },
    },
  ],
  login: [
    {
      type: "function",
      function: {
        name: "authenticateUser",
        description:
          "Authenticates a user with email and password, returning a JWT if the credentials are correct.",
        parameters: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "The user's email.",
            } as FunctionParameters,
            password: {
              type: "string",
              description: "The user's password.",
            } as FunctionParameters,
          },
          required: ["email", "password"],
        } as FunctionParameters,
      },
    },
  ],
};
