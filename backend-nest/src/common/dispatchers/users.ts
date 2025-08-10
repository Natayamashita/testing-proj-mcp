// dispatchers/users.ts
import { z } from "zod";
import { UsersService } from "src/users/users.service";

// Schemas Zod
const CreateUserZ = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
}).strict();

const GetUsersZ = z.object({
  email: z.string().email("Email inválido"),
}).strict();

export default function buildUsersDispatcher(users: UsersService) {
  return {
    async createUser(raw: unknown) {
      const { email, password } = CreateUserZ.parse(raw);
      return users.create({ email, password });
    },
    async getUsers(raw: unknown) {
      const { email } = GetUsersZ.parse(raw);
      return users.findByEmail(email);
    },
  } as const;
}
