import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateProductDto, @Request() req) {
    return this.productsService.create(dto.name, req.user.userId);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
