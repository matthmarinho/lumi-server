import { PrismaClient, EnergyInvoice } from '@prisma/client';
import pdfParse from 'pdf-parse';
import fs from 'fs';

const prisma = new PrismaClient();

interface ExtractedData {
  customerNumber: string;
  customerName: string;
  referenceMonth: string;
  referenceYear: string;
  electricEnergyQuantity?: number;
  electricEnergyValue?: number;
  sceeeEnergyQuantity?: number;
  sceeeEnergyValue?: number;
  compensatedEnergyQuantity?: number;
  compensatedEnergyValue?: number;
  publicLightingContribution?: number;
  total?: number;
}

export const processPDF = async (filePath: string): Promise<{ fileBuffer: Buffer; extractedData: ExtractedData }> => {
  const fileBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(fileBuffer);
  const extractedData: ExtractedData = extractInvoiceData(pdfData.text);

  return { fileBuffer, extractedData };
};

export const extractInvoiceData = (pdfText: string): ExtractedData => {
  let arr = pdfText.split('\n');
  arr = removeEmptyElements(arr);

  const customerNumberIndex = arr.findIndex(item => item.includes('Nº DO CLIENTE'));
  const referenceMonthIndex = arr.findIndex(item => item.includes('Referente a'));
  const stateNumber = arr.findIndex(item => item.includes('INSCRIÇÃO ESTADUAL'));
  const totalIndex = arr.findIndex(item => item.includes('TOTAL'));
  const customerNumber = arr[customerNumberIndex+1].split(/\s{2,}/g);
  const reference = arr[referenceMonthIndex+1].split(/\s{2,}/g)[0];
  const referenceMonth = reference.split('/')[0];
  const referenceYear = reference.split('/')[1];

  let customerName = arr[customerNumberIndex-5]
  if (stateNumber != -1) {
    customerName = arr[customerNumberIndex-6];
  }

  const electricEnergyQuantity = arr[3].split(/\s{2,}/g);
  const electricEnergyValue = arr[3].split(/\s{2,}/g);
  const sceeeEnergyQuantity = arr[4].split(/\s{2,}/g)
  const sceeeEnergyValue = arr[4].split(/\s{2,}/g)
  const compensatedEnergyQuantity = arr[5].split(/\s{2,}/g)
  const compensatedEnergyValue = arr[5].split(/\s{2,}/g)
  const publicLightingContribution = arr[6].split(/\s{2,}/g)
  const total = arr[totalIndex].split(/\s{2,}/g)

  return {
    customerNumber: customerNumber ? customerNumber[0] : '',
    customerName: customerName ? customerName : '',
    referenceMonth: referenceMonth ? referenceMonth : '',
    referenceYear: referenceYear ? referenceYear : '',
    electricEnergyQuantity: electricEnergyQuantity ? parseFloat(electricEnergyQuantity[1].replace(/,/, '.')) : undefined,
    electricEnergyValue: electricEnergyValue ? parseFloat(electricEnergyValue[2].replace(/,/, '.')) : undefined,
    sceeeEnergyQuantity: sceeeEnergyQuantity ? parseFloat(sceeeEnergyQuantity[1].replace(/,/, '.')) : undefined,
    sceeeEnergyValue: sceeeEnergyValue ? parseFloat(sceeeEnergyValue[2].replace(/,/, '.')) : undefined,
    compensatedEnergyQuantity: compensatedEnergyQuantity ? parseFloat(compensatedEnergyQuantity[1].replace(/,/, '.')) : undefined,
    compensatedEnergyValue: compensatedEnergyValue ? parseFloat(compensatedEnergyValue[2].replace(/,/, '.')) : undefined,
    publicLightingContribution: publicLightingContribution ? parseFloat(publicLightingContribution[1].replace(/,/, '.')) : undefined,
    total: total ? parseFloat(total[1].replace(/,/, '.')) : undefined,
  };
};

export const saveEnergyInvoiceToDatabase = async (fileBuffer: Buffer, extractedData: ExtractedData): Promise<EnergyInvoice> => {
  const savedInvoice = await prisma.energyInvoice.create({
    data: {
      ...extractedData,
      pdfData: fileBuffer,
    },
  });
  return savedInvoice;
};

export const removeTempFile = (filePath: string): void => {
  fs.unlinkSync(filePath);
};

const removeEmptyElements = (arr: any[]) => {
  let filteredArr: any[] = [];
  arr.forEach((element: string | null | undefined) => {
      if (element !== undefined && element !== null && element.trim() !== "") {
          filteredArr.push(element.trim());
      }
  });
  return filteredArr;
}