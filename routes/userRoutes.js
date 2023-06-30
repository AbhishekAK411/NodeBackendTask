import express from "express";
import { addProduct } from "../controllers/products.js";
import { countProduct, pagination } from "../controllers/questions.js";

const router = express.Router();

router.get("/addProduct", addProduct);
router.get("/getCount", countProduct);
router.get("/pagination", pagination);
export default router;