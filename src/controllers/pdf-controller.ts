import { Request, Response } from 'express';
import { processPDF, removeTempFile, saveEnergyInvoiceToDatabase } from '../services/pdf-service';

export async function uploadPDF(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
      return;
    }

    const filePath = req.file.path;
    const { fileBuffer, extractedData } = await processPDF(filePath);
    const savedInvoice = await saveEnergyInvoiceToDatabase(fileBuffer, extractedData);

    removeTempFile(filePath);

    res.status(201).json({ 
      message: 'Fatura de energia salva com sucesso!', 
      data: savedInvoice
    });
  } catch (e) {
    res.status(500).json({ e: 'Erro ao processar e salvar a fatura de energia' });
  }
}