import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContextModule } from './context/context.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ProductsModule, ContextModule],
})
export class AppModule {}
