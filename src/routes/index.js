
import { Router } from "express";
import userRouter from "../modules/user/user.router.js";
import authRouter from "../modules/auth/auth.router.js"
import townRouter from '../modules/town/town.router.js'

const router = Router();

router.get('/health', (req, res) => {
    res.send("API is healthy");
})

router.use('/auth', authRouter);
router.use("/users", userRouter);
router.use("/towns", townRouter);

export default router;
