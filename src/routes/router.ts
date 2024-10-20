import { Router } from "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  create,
  show,
  update,
  remove,
  showLibrary,
  showDashboard,
} from "../controllers/energy-invoice-controller";
import { uploadPDF } from '../controllers/pdf-controller';

const router: Router = Router();

const uploadFolder = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const upload = multer({ dest: uploadFolder });

router.post("/energy-invoices", create);
router.get("/energy-invoices", show);
router.put("/energy-invoices/:id", update);
router.delete("/energy-invoices/:id", remove);
router.post('/upload-pdf', upload.single('pdf'), uploadPDF);
router.get('/library', showLibrary);
router.get('/dashboard', showDashboard);

export default router;