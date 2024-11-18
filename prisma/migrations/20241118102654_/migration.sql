/*
  Warnings:

  - Added the required column `cancellationReason` to the `ProjectDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `ProjectDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pauseReason` to the `ProjectDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProjectDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectDetails" ADD COLUMN     "cancellationReason" TEXT NOT NULL,
ADD COLUMN     "createdAt" TEXT NOT NULL,
ADD COLUMN     "pauseReason" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TEXT NOT NULL;
