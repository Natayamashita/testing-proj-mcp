import buildProductsDispatcher from "../dispatchers/products";
import buildUsersDispatcher from "../dispatchers/users";
import { ProductsService } from "src/products/products.service";
import { UsersService } from "src/users/users.service";
import { FuncName } from "src/types/ApisTypes";

type Services = { products: ProductsService; users: UsersService };

type ProductsHandlers = ReturnType<typeof buildProductsDispatcher>;
type UsersHandlers = ReturnType<typeof buildUsersDispatcher>;

type HandlerByFunc = {
  createProduct: ProductsHandlers["createProduct"];
  getProducts:   ProductsHandlers["getProducts"];
  createUser:    UsersHandlers["createUser"];
  getUsers:      UsersHandlers["getUsers"];
};

export function getToolExecutor<F extends FuncName>(
  funcName: F,
  services: Services
): HandlerByFunc[F] {
  const products = buildProductsDispatcher(services.products);
  const users    = buildUsersDispatcher(services.users);

  const map = {
    createProduct: products.createProduct,
    getProducts:   products.getProducts,
    createUser:    users.createUser,
    getUsers:      users.getUsers,
  } as const;

  return map[funcName] as HandlerByFunc[F];
}
