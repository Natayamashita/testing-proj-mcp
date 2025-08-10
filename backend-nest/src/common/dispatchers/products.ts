// dispatchers/products.ts
import { z } from "zod";
import { ProductsService } from "src/products/products.service";

// Schemas Zod
const CreateProductZ = z.object({
  name: z.string().min(4, "Nome muito curto"),
  price: z.coerce.number(),
  userId: z.coerce.number(),
}).strict();

const GetProductsZ = z.object({}).strict();

export default function buildProductsDispatcher(products: ProductsService) {
  return {
    async createProduct(raw: unknown) {
      const { name, price, userId } = CreateProductZ.parse(raw);
      return products.create({ name, price, userId });
    },
    async getProducts(raw: unknown) {
      GetProductsZ.parse(raw);
      return products.findAll();
    },
  } as const;
}
