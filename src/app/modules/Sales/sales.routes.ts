import { Router } from "express";

const router = Router();

// sale a product
router.post("/sales");

// get sale history
router.get("/sales");

const salesRouter = router;
export default salesRouter;
