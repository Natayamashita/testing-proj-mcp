import { Injectable } from "@nestjs/common";
import { CreateContextDto } from "./dto/create-context.dto";
import { callDeepSeekPrompt } from "src/common/externServices/deepseek";

@Injectable()
export class ContextService {
  async sendPrompt(createContextDto: CreateContextDto) {
    
    return await callDeepSeekPrompt(createContextDto)
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
