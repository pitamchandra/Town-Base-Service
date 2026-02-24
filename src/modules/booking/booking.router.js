import { Router } from "express";
import { createBooking } from "./booking.controller.js";
import { protect } from "../../middlewares/auth.js";
const router = Router()

router.post('/', protect, createBooking)

export default router;