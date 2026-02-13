import { Router } from "express";
import { createTown, getTowns, updateTown } from "./town.controller.js";
import { protect, restrictTo } from "../../middlewares/auth.js";

const router = Router();

router.get('/', getTowns)
router.post('/', protect, restrictTo('admin'), createTown)
router.patch('/', protect, restrictTo('admin'), updateTown)

export default router;