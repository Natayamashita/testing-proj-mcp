import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ContextService } from './context.service';
import { CreateContextDto } from './dto/create-context.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contexto')
@Controller('context')
export class ContextController {
  constructor(private readonly contextService: ContextService) {}

  @Post()
  async prompt(@Body() createContextDto: CreateContextDto) {
    const promptRes = await this.contextService.sendPrompt(createContextDto);
    //valida se o prompt instruiu a base corretamente ou nao
    if(promptRes == 'not found') throw new NotFoundException('no instructions clear or no function called');

    return promptRes;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contextService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contextService.remove(+id);
  }
}
