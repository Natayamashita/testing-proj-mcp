import { normalize } from "./normalize";

export default function (prompt: string) {
  const keysApis = Object.keys(systemApis);
  const findApiUses: string[] = keysApis.filter((opt: string) => 
    normalize(prompt).includes(normalize(opt))
  );
  console.log(JSON.stringify(findApiUses.map((option) => systemApis[option])),`test`)

  return findApiUses.map((option) => systemApis[option]);
}

const systemApis = {
  product: [
    {
      type: "function",
      function: {
        name: "criarProduto",
        description: "Cria um novo produto associado ao usuário autenticado.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "O nome do produto a ser criado.",
            },
            userId: {
              type: "string",
              description:
                "O ID do usuário autenticado que está criando o produto.",
            },
          },
          required: ["name", "userId"],
        },
      },
    },
  ],
  user: [
    {
      type: "function",
      function: {
        name: "criarUsuario",
        description:
          "Cria um novo usuário com e-mail e senha. A senha será armazenada de forma segura com hash.",
        parameters: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "O e-mail do novo usuário.",
            },
            password: {
              type: "string",
              description: "A senha do usuário",
            },
          },
          required: ["email", "password"],
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
  login: [
    {
      type: "function",
      function: {
        name: "autenticarUsuario",
        description:
          "Autentica um usuário existente com e-mail e senha, retornando um token JWT se as credenciais estiverem corretas.",
        parameters: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "O e-mail do usuário a ser autenticado.",
            },
            password: {
              type: "string",
              description: "A senha do usuário a ser autenticado.",
            },
          },
          required: ["email", "password"],
        },
      },
    },
  ],
};
