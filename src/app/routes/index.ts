import { Router } from "express";
import userRoutes from "../modules/User/user.routes";
import productRouter from "../modules/Product/product.routes";
import salesRouter from "../modules/Sales/sales.routes";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/products",
    route: productRouter,
  },
  {
    path: "/sales",
    route: salesRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
