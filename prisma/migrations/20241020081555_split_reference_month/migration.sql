/*
  Warnings:

  - Added the required column `referenceYear` to the `energy_invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "energy_invoice" ADD COLUMN     "referenceYear" TEXT NOT NULL;
