import { PrismaClient } from '@prisma/client';
import { PDFDocument } from 'pdf-lib';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Inserção no Banco de Dados', () => {
  it('deve inserir uma nova fatura de energia no banco de dados', async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('Conta em PDF!');
    const pdfBytes = await pdfDoc.save();
    const fileBuffer = Buffer.from(pdfBytes);

    const newInvoice = {
      customerNumber: '123456789',
      customerName: 'Test',
      referenceMonth: 'JAN',
      referenceYear: '2024',
      electricEnergyQuantity: 1,
      electricEnergyValue: 2,
      sceeeEnergyQuantity: 3,
      sceeeEnergyValue: 4,
      compensatedEnergyQuantity: 5,
      compensatedEnergyValue: 6,
      publicLightingContribution: 7,
      total: 8,
      pdfData: fileBuffer,
    };

    const createdInvoice = await prisma.energyInvoice.create({
      data: newInvoice,
    });

    expect(createdInvoice).toMatchObject({
      customerNumber: newInvoice.customerNumber,
      customerName: newInvoice.customerName,
      referenceMonth: newInvoice.referenceMonth,
      referenceYear: newInvoice.referenceYear,
      electricEnergyQuantity: newInvoice.electricEnergyQuantity,
      electricEnergyValue: newInvoice.electricEnergyValue,
      sceeeEnergyQuantity: newInvoice.sceeeEnergyQuantity,
      sceeeEnergyValue: newInvoice.sceeeEnergyValue,
      compensatedEnergyQuantity: newInvoice.compensatedEnergyQuantity,
      compensatedEnergyValue: newInvoice.compensatedEnergyValue,
      publicLightingContribution: newInvoice.publicLightingContribution,
      total: newInvoice.total,
    });

    await prisma.energyInvoice.delete({ where: { id: createdInvoice.id } });
  });
});