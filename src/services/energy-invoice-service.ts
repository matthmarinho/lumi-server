import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEnergyInvoice = async (data: Prisma.EnergyInvoiceCreateInput) => {
  const energyInvoice = await prisma.energyInvoice.create({
    data: {
      customerNumber: data.customerNumber,
      referenceMonth: data.referenceMonth,
      electricEnergyQuantity: data.electricEnergyQuantity,
      electricEnergyValue: data.electricEnergyValue,
      sceeeEnergyQuantity: data.sceeeEnergyQuantity,
      sceeeEnergyValue: data.sceeeEnergyValue,
      compensatedEnergyQuantity: data.compensatedEnergyQuantity,
      compensatedEnergyValue: data.compensatedEnergyValue,
      publicLightingContribution: data.publicLightingContribution,
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
      customerNumber: data.customerNumber,
      referenceMonth: data.referenceMonth,
      electricEnergyQuantity: data.electricEnergyQuantity,
      electricEnergyValue: data.electricEnergyValue,
      sceeeEnergyQuantity: data.sceeeEnergyQuantity,
      sceeeEnergyValue: data.sceeeEnergyValue,
      compensatedEnergyQuantity: data.compensatedEnergyQuantity,
      compensatedEnergyValue: data.compensatedEnergyValue,
      publicLightingContribution: data.publicLightingContribution,
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