import { Router } from "express";
import ApiRouter from "./router";

const router: Router = Router();

router.use("/api/", ApiRouter);

export default router;