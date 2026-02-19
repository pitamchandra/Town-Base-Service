
import { Router } from "express";
import userRouter from "../modules/user/user.router.js";
import authRouter from "../modules/auth/auth.router.js"
import townRouter from '../modules/town/town.router.js';
import categoryRouter from "../modules/catalog/category.router.js"
import subsectionRouter from "../modules/catalog/subsection.router.js"
import addonRouter from '../modules/catalog/addon.router.js'

const router = Router();

router.get('/health', (req, res) => {
    res.send("API is healthy");
})

router.use('/auth', authRouter);
router.use("/users", userRouter);
router.use("/towns", townRouter);
router.use("/categories", categoryRouter);
router.use("/subsections", subsectionRouter);
router.use("/addons", addonRouter);

export default router;
