import { Router } from "express";
import productControllers from "./product.controllers";
import requestValidate from "../../middlewares/requestValidation";
import { productValidationSchemas } from "./product.validation";
import auth from "../../middlewares/auth";

const router = Router();

// create new product
router.post(
  "/",
  auth(),
  requestValidate(productValidationSchemas.productCreateValidationSchema),
  productControllers.createProduct,
);

// update a product
router.put(
  "/:id",
  auth(),
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
router.delete("/:id", auth(), productControllers.deleteProduct);

const productRouter = router;
export default productRouter;
