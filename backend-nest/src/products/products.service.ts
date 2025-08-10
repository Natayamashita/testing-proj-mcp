import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(productBody: {name: string, userId: number, price: number}) {
    return this.prisma.product.create({ data: productBody });
  }

  findAll() {
    return this.prisma.product.findMany();
  }
}
