-- DropForeignKey
ALTER TABLE "BudgetDetails" DROP CONSTRAINT "BudgetDetails_projectID_fkey";

-- DropForeignKey
ALTER TABLE "ResourceDetails" DROP CONSTRAINT "ResourceDetails_projectID_fkey";

-- AddForeignKey
ALTER TABLE "ResourceDetails" ADD CONSTRAINT "ResourceDetails_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "ProjectDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetDetails" ADD CONSTRAINT "BudgetDetails_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "ProjectDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
