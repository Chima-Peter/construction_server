/*
  Warnings:

  - You are about to drop the `Budget` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projectID]` on the table `ProjectDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectID` to the `ProjectDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_id_fkey";

-- DropForeignKey
ALTER TABLE "BudgetDetails" DROP CONSTRAINT "BudgetDetails_projectID_fkey";

-- DropForeignKey
ALTER TABLE "ResourceDetails" DROP CONSTRAINT "ResourceDetails_projectID_fkey";

-- AlterTable
ALTER TABLE "ProjectDetails" ADD COLUMN     "projectID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Budget";

-- CreateTable
CREATE TABLE "BudgetResources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "units" TEXT NOT NULL,
    "spent" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "BudgetResources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_userId_key" ON "Project"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDetails_projectID_key" ON "ProjectDetails"("projectID");

-- AddForeignKey
ALTER TABLE "BudgetResources" ADD CONSTRAINT "BudgetResources_id_fkey" FOREIGN KEY ("id") REFERENCES "BudgetDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDetails" ADD CONSTRAINT "ProjectDetails_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceDetails" ADD CONSTRAINT "ResourceDetails_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetDetails" ADD CONSTRAINT "BudgetDetails_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
