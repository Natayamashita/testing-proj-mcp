import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContextService } from './context.service';
import { CreateContextDto } from './dto/create-context.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contexto')
@Controller('context')
export class ContextController {
  constructor(private readonly contextService: ContextService) {}

  @Post()
  prompt(@Body() createContextDto: CreateContextDto) {
    return this.contextService.sendPrompt(createContextDto);
  }

  @Get()
  findAll() {
    return this.contextService.findAll();
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
