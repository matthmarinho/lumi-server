import { Router } from "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  create,
  show,
  update,
  remove,
} from "../controllers/energy-invoice-controller";
import { uploadPDF } from '../controllers/pdf-controller';

const router: Router = Router();

const uploadFolder = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const upload = multer({ dest: uploadFolder });

router.post("/energyInvoices", create);
router.get("/energyInvoices", show);
router.put("/energyInvoices/:id", update);
router.delete("/energyInvoices/:id", remove);
router.post('/upload-pdf', upload.single('pdf'), uploadPDF);

export default router;