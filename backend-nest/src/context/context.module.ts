import { Module } from '@nestjs/common';
import { ContextService } from './context.service';
import { ContextController } from './context.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [ContextController],
  providers: [ContextService],
  imports: [
    UsersModule,        // <-- importar quem exporta UsersService
    ProductsModule,     // <-- importar quem exporta ProductsService
  ],
})
export class ContextModule {}
