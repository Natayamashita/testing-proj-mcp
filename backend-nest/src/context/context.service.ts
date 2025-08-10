import { Injectable } from "@nestjs/common";
import { CreateContextDto } from "./dto/create-context.dto";
import { callDeepSeekPrompt } from "src/common/externServices/deepseek";
import { ProductsService } from "src/products/products.service";
import { getToolExecutor } from "src/common/mappers/toolFunctionMapper";
import { UsersService } from "./../users/users.service";
import { FuncName } from "src/types/ApisTypes";

function safeParse(json: string) {
  try {
    return json ? JSON.parse(json) : {};
  } catch {
    return {};
  }
}

@Injectable()
export class ContextService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly userService: UsersService
  ) {}

  async sendPrompt(createContextDto: CreateContextDto) {
    try {
      const deepSeekRes = await callDeepSeekPrompt(createContextDto);
      console.log(deepSeekRes, `deepSeekRes`);
      if(deepSeekRes.content.toLocaleLowerCase().includes('invalid output')) return deepSeekRes.content;
      const functionName = deepSeekRes.tool_calls[0].function.name as FuncName;
      const exec = getToolExecutor(functionName, {
        users: this.userService,
        products: this.productsService,
      });

      const args = safeParse(deepSeekRes.tool_calls[0].function.arguments);
      const result = await exec(args);

      return result;
    } catch (err) {
      return err;
    }
  }

  findAll() {
    return `This action returns all context`;
  }

  findOne(id: number) {
    return `This action returns a #${id} context`;
  }

  remove(id: number) {
    return `This action removes a #${id} context`;
  }
}
