/*
  Warnings:

  - You are about to drop the column `quantity` on the `BudgetDetails` table. All the data in the column will be lost.
  - You are about to drop the column `totalBudget` on the `BudgetDetails` table. All the data in the column will be lost.
  - You are about to drop the column `projectID` on the `ProjectDetails` table. All the data in the column will be lost.
  - You are about to drop the `BudgetResources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resources` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `ProjectDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `estimated` to the `BudgetDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remaining` to the `BudgetDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spent` to the `BudgetDetails` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `ProjectDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `cost` to the `ResourceDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ResourceDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ResourceDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `ResourceDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BudgetDetails" DROP CONSTRAINT "BudgetDetails_projectID_fkey";

-- DropForeignKey
ALTER TABLE "BudgetResources" DROP CONSTRAINT "BudgetResources_id_fkey";

-- DropForeignKey
ALTER TABLE "ProjectDetails" DROP CONSTRAINT "ProjectDetails_projectID_fkey";

-- DropForeignKey
ALTER TABLE "ResourceDetails" DROP CONSTRAINT "ResourceDetails_projectID_fkey";

-- DropForeignKey
ALTER TABLE "Resources" DROP CONSTRAINT "Resources_id_fkey";

-- DropIndex
DROP INDEX "ProjectDetails_projectID_key";

-- DropIndex
DROP INDEX "ResourceDetails_projectID_key";

-- AlterTable
ALTER TABLE "BudgetDetails" DROP COLUMN "quantity",
DROP COLUMN "totalBudget",
ADD COLUMN     "estimated" INTEGER NOT NULL,
ADD COLUMN     "remaining" INTEGER NOT NULL,
ADD COLUMN     "spent" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProjectDetails" DROP COLUMN "projectID",
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ResourceDetails" ADD COLUMN     "cost" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL;

-- DropTable
DROP TABLE "BudgetResources";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Resources";

-- DropEnum
DROP TYPE "Status";

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDetails_name_key" ON "ProjectDetails"("name");

-- AddForeignKey
ALTER TABLE "ResourceDetails" ADD CONSTRAINT "ResourceDetails_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "ProjectDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetDetails" ADD CONSTRAINT "BudgetDetails_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "ProjectDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
