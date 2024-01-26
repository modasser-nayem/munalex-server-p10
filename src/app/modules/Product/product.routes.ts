import { Router } from "express";

const router = Router();

// get all product
router.get("/");

// create new product
router.post("/");

// update a product
router.put("/");

// delete a product
router.delete("/");

const productRouter = router;
export default productRouter;
