// src/modules/user/user.router.js

import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { createUser, getAllUsers, me } from "./user.controller.js";
import { protect } from "../../middlewares/auth.js";

// module router
const router = Router();

// router.post('/', createUser)
router.get("/", getAllUsers)
router.get('/me', protect , me)

// export router
export default router;
