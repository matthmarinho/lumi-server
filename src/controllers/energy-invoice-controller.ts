import { Request, Response } from "express";
import {
  createEnergyInvoice,
  showEnergyInvoices,
  updateEnergyInvoice,
  deleteEnergyInvoice,
  getEnergyInvoicesLibrary,
  getEnergyInvoicesDashboard,
} from "../services/energy-invoice-service";

export const create = async (req: Request, res: Response) => {
  try {
    const energyInvoice = await createEnergyInvoice({
      customerName: req.body.customerName,
      customerNumber: req.body.customerNumber,
      referenceMonth: req.body.referenceMonth,
      referenceYear: req.body.referenceYear,
      electricEnergyQuantity: req.body.electricEnergyQuantity,
      electricEnergyValue: req.body.electricEnergyValue,
      sceeeEnergyQuantity: req.body.sceeeEnergyQuantity,
      sceeeEnergyValue: req.body.sceeeEnergyValue,
      compensatedEnergyQuantity: req.body.compensatedEnergyQuantity,
      compensatedEnergyValue: req.body.compensatedEnergyValue,
      publicLightingContribution: req.body.publicLightingContribution,
      total: req.body.total,
      pdfData: req.body.pdfData,
    });

    res.status(201).json({
      message: "Success Create Energy Invoice",
      data: energyInvoice,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const energyInvoices = await showEnergyInvoices();

    res.status(201).json({
      message: "List Data Energy Invoice",
      data: energyInvoices,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const energyInvoice = await updateEnergyInvoice(
      {
        customerName: req.body.customerName,
        customerNumber: req.body.customerNumber,
        referenceMonth: req.body.referenceMonth,
        referenceYear: req.body.referenceYear,
        electricEnergyQuantity: req.body.electricEnergyQuantity,
        electricEnergyValue: req.body.electricEnergyValue,
        sceeeEnergyQuantity: req.body.sceeeEnergyQuantity,
        sceeeEnergyValue: req.body.sceeeEnergyValue,
        compensatedEnergyQuantity: req.body.compensatedEnergyQuantity,
        compensatedEnergyValue: req.body.compensatedEnergyValue,
        publicLightingContribution: req.body.publicLightingContribution,
        total: req.body.total,
        pdfData: req.body.pdfData,
      },
      id
    );

    res.status(201).json({
      message: "Success Update Energy Invoice",
      data: energyInvoice,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const energyInvoice = await deleteEnergyInvoice(id);

    res.status(201).json({
      message: "Success Delete Energy Invoice",
      data: energyInvoice,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const showLibrary = async (req: Request, res: Response) => {
  try {
    const groupedInvoices = await getEnergyInvoicesLibrary();

    res.status(201).json({
      message: 'Energy Invoices Library',
      data: groupedInvoices,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const showDashboard = async (req: Request, res: Response) => {
  try {
    const dashboard = await getEnergyInvoicesDashboard();

    res.status(201).json({
      message: 'Energy Invoices Dashboard',
      data: dashboard,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
