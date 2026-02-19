import { Router } from "express";
import { getCategories, createCategory } from "./category.controller.js";
import { protect, restrictTo } from "../../middlewares/auth.js";

const router = Router();

router.get('/', getCategories);
router.post('/', protect, restrictTo('admin'), createCategory);

export default router;