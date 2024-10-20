import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEnergyInvoice = async (data: Prisma.EnergyInvoiceCreateInput) => {
  const energyInvoice = await prisma.energyInvoice.create({
    data: {
      customerName: data.customerName,
      customerNumber: data.customerNumber,
      referenceMonth: data.referenceMonth,
      referenceYear: data.referenceYear,
      electricEnergyQuantity: data.electricEnergyQuantity,
      electricEnergyValue: data.electricEnergyValue,
      sceeeEnergyQuantity: data.sceeeEnergyQuantity,
      sceeeEnergyValue: data.sceeeEnergyValue,
      compensatedEnergyQuantity: data.compensatedEnergyQuantity,
      compensatedEnergyValue: data.compensatedEnergyValue,
      publicLightingContribution: data.publicLightingContribution,
      total: data.total,
      pdfData: data.pdfData,
    },
  });

  return energyInvoice;
};

export const showEnergyInvoices = async () => {
  const energyInvoices = await prisma.energyInvoice.findMany();

  return energyInvoices;
};

export const updateEnergyInvoice = async (
  data: Prisma.EnergyInvoiceUpdateInput,
  id: string
) => {
  const energyInvoice = await prisma.energyInvoice.update({
    where: { id: id },
    data: {
      customerName: data.customerName,
      customerNumber: data.customerNumber,
      referenceMonth: data.referenceMonth,
      referenceYear: data.referenceYear,
      electricEnergyQuantity: data.electricEnergyQuantity,
      electricEnergyValue: data.electricEnergyValue,
      sceeeEnergyQuantity: data.sceeeEnergyQuantity,
      sceeeEnergyValue: data.sceeeEnergyValue,
      compensatedEnergyQuantity: data.compensatedEnergyQuantity,
      compensatedEnergyValue: data.compensatedEnergyValue,
      publicLightingContribution: data.publicLightingContribution,
      total: data.total,
      pdfData: data.pdfData,
    },
  });

  return energyInvoice;
};

export const deleteEnergyInvoice = async (id: string) => {
  const energyInvoice = await prisma.energyInvoice.delete({
    where: {
      id: id,
    },
  });

  return energyInvoice;
};

export const getEnergyInvoicesLibrary = async () => {
  const energyInvoices = await prisma.energyInvoice.findMany({
    orderBy: { customerNumber: 'asc' },
  });

  const invoices = energyInvoices.reduce((acc, invoice) => {
    const { customerNumber, customerName, referenceMonth, referenceYear, pdfData } = invoice;

    let customer = acc.find((item) => item.customerNumber === customerNumber);

    if (!customer) {
      customer = { customerNumber, customerName, referenceYear, pdfFiles: [] };
      acc.push(customer);
    }

    customer.pdfFiles.push({ referenceMonth, pdfFile: pdfData });

    return acc;
  }, [] as { customerNumber: string; customerName: string | null; referenceYear: string; pdfFiles: Array<{ referenceMonth: string; pdfFile: Buffer }> }[]);

  const customerNumbers = [...new Set(energyInvoices.map(invoice => invoice.customerNumber))];
  const years = [...new Set(energyInvoices.map(invoice => invoice.referenceYear))];

  return { invoices, customerNumbers, years };
};

export const getEnergyInvoicesDashboard = async () => {
    const energyInvoices = await prisma.energyInvoice.findMany();

    const dashboard = energyInvoices.map(invoice => {
      const electricEnergyConsumption = (invoice.electricEnergyQuantity || 0) + (invoice.sceeeEnergyQuantity || 0);
      const compensatedEnergy = invoice.compensatedEnergyQuantity || 0;
      const totalValueWithoutGD = (invoice.electricEnergyValue || 0) + (invoice.sceeeEnergyValue || 0) + (invoice.publicLightingContribution || 0);
      const GDSavings = invoice.compensatedEnergyValue || 0;

      return {
        customerNumber: invoice.customerNumber,
        referenceMonth: invoice.referenceMonth,
        referenceYear: invoice.referenceYear,
        electricEnergyConsumption,
        compensatedEnergy,
        totalValueWithoutGD,
        GDSavings,
      };
    });

    const customerNumbers = [...new Set(energyInvoices.map(invoice => invoice.customerNumber))];
    const years = [...new Set(energyInvoices.map(invoice => invoice.referenceYear))];

    return { dashboard, customerNumbers, years };
};