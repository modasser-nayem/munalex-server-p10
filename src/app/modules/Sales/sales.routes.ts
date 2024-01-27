import { Router } from "express";
import salesControllers from "./sales.controllers";
import requestValidate from "../../middlewares/requestValidation";
import salesValidationSchemas from "./sales.validation";

const router = Router();

// sale a product
router.post(
  "/:id",
  requestValidate(salesValidationSchemas.saleProductValidationSchema),
  salesControllers.saleProduct,
);

// get sale history
router.get("/history", salesControllers.getSalesHistory);

// get all sales product
router.get("/", salesControllers.getAllSales);

const salesRouter = router;
export default salesRouter;
