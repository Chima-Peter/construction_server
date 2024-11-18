/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ProjectDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ProjectDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectDetails" ADD COLUMN     "userId" INTEGER DEFAULT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDetails_userId_key" ON "ProjectDetails"("userId");

-- AddForeignKey
ALTER TABLE "ProjectDetails" ADD CONSTRAINT "ProjectDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
