-- CreateTable
CREATE TABLE "energy_invoice" (
    "id" TEXT NOT NULL,
    "customerNumber" TEXT NOT NULL,
    "referenceMonth" TEXT NOT NULL,
    "electricEnergyQuantity" DOUBLE PRECISION,
    "electricEnergyValue" DOUBLE PRECISION,
    "sceeeEnergyQuantity" DOUBLE PRECISION,
    "sceeeEnergyValue" DOUBLE PRECISION,
    "compensatedEnergyQuantity" DOUBLE PRECISION,
    "compensatedEnergyValue" DOUBLE PRECISION,
    "publicLightingContribution" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "energy_invoice_pkey" PRIMARY KEY ("id")
);
