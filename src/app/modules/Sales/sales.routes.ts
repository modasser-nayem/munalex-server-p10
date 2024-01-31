import { Router } from "express";
import salesControllers from "./sales.controllers";
import requestValidate from "../../middlewares/requestValidation";
import salesValidationSchemas from "./sales.validation";
import auth from "../../middlewares/auth";

const router = Router();

// sale a product
router.post(
  "/:id",
  auth(),
  requestValidate(salesValidationSchemas.saleProductValidationSchema),
  salesControllers.saleProduct,
);

// get sale history
router.get("/history", auth(), salesControllers.getSalesHistory);

// get all sales product
router.get("/", auth(), salesControllers.getAllSales);

const salesRouter = router;
export default salesRouter;
