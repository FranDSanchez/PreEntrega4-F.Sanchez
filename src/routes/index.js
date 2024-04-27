import { Router, response } from "express";
import productsRouter from "./products.routes.js";
import cartsRoutes from "./carts.routes.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRoutes);

export default router;
