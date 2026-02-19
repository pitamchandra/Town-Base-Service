import { Router } from "express";
import { getSubsections, createSubsection } from "./subsection.controller.js";
import { protect, restrictTo } from "../../middlewares/auth.js";

const router = Router()

router.get('/', getSubsections);
router.post('/', protect, restrictTo('admin'), createSubsection);

export default router;