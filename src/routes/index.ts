import { Router } from "express";
import ProductRouter from "./energy-invoice-router";

const router: Router = Router();

router.use("/api/", ProductRouter);

export default router;