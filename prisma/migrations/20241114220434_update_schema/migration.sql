-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'PLANNING', 'IN_PROGRESS', 'NEAR_COMPLETION', 'COMPLETE', 'PAUSED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Resources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "units" TEXT NOT NULL,
    "spent" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "Resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "units" TEXT NOT NULL,
    "spent" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectDetails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "keyDetails" TEXT[],
    "milestones" TEXT[],

    CONSTRAINT "ProjectDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceDetails" (
    "id" SERIAL NOT NULL,
    "projectID" INTEGER NOT NULL,

    CONSTRAINT "ResourceDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetDetails" (
    "id" SERIAL NOT NULL,
    "projectID" INTEGER NOT NULL,
    "totalBudget" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "BudgetDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResourceDetails_projectID_key" ON "ResourceDetails"("projectID");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetDetails_projectID_key" ON "BudgetDetails"("projectID");

-- AddForeignKey
ALTER TABLE "Resources" ADD CONSTRAINT "Resources_id_fkey" FOREIGN KEY ("id") REFERENCES "ResourceDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_id_fkey" FOREIGN KEY ("id") REFERENCES "BudgetDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceDetails" ADD CONSTRAINT "ResourceDetails_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "ProjectDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetDetails" ADD CONSTRAINT "BudgetDetails_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "ProjectDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
