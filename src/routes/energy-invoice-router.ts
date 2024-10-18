import { Router } from "express";
import {
  create,
  show,
  update,
  remove,
} from "../controllers/energy-invoice-controller";

const router: Router = Router();

router.post("/energyInvoices", create);
router.get("/energyInvoices", show);
router.put("/energyInvoices/:id", update);
router.delete("/energyInvoices/:id", remove);

export default router;