import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, userId: number) {
    return this.prisma.product.create({ data: { name, userId } });
  }

  findAll() {
    return this.prisma.product.findMany();
  }
}
