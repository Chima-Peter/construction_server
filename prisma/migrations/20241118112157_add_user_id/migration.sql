-- DropForeignKey
ALTER TABLE "ProjectDetails" DROP CONSTRAINT "ProjectDetails_userId_fkey";

-- DropIndex
DROP INDEX "ProjectDetails_userId_key";
