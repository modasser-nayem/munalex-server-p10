import { Router } from "express";
import productControllers from "./product.controllers";
import requestValidate from "../../middlewares/requestValidation";
import { productValidationSchemas } from "./product.validation";

const router = Router();

// create new product
router.post(
  "/",
  requestValidate(productValidationSchemas.productCreateValidationSchema),
  productControllers.createProduct,
);

// update a product
router.put(
  "/:id",
  requestValidate(productValidationSchemas.productUpdateValidationSchema),
  productControllers.updateProduct,
);

// get all product
router.get("/", productControllers.getAllProduct);

// get product products filtering dynamic data
router.get(
  "/filtering-data",
  productControllers.getProductsFilteringDynamicData,
);

// get single product
router.get("/:id", productControllers.getSingleProduct);

// delete a product
router.delete("/:id", productControllers.deleteProduct);

const productRouter = router;
export default productRouter;
