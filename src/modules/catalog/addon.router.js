import { Router } from "express";
import { createAddon, getAddons } from "./addon.controller.js";
import { protect, restrictTo } from "../../middlewares/auth.js";

const router = Router()

router.get('/', getAddons)
router.post('/', protect, restrictTo('admin'), createAddon)

export default router;