/*
  Warnings:

  - The values [PENDING] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `customerId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `credit_reservations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `credits_ledger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `credits_wallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `status` on table `Subscription` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plan` on table `Subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionStatus_new" AS ENUM ('ACTIVE', 'CANCELED');
ALTER TABLE "Subscription" ALTER COLUMN "status" TYPE "SubscriptionStatus_new" USING ("status"::text::"SubscriptionStatus_new");
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "public"."SubscriptionStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- DropForeignKey
ALTER TABLE "credit_reservations" DROP CONSTRAINT "credit_reservations_userId_fkey";

-- DropForeignKey
ALTER TABLE "credits_ledger" DROP CONSTRAINT "credits_ledger_userId_fkey";

-- DropForeignKey
ALTER TABLE "credits_wallet" DROP CONSTRAINT "credits_wallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_userId_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "customerId",
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "plan" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "passwordHash",
DROP COLUMN "verificationToken",
ALTER COLUMN "name" DROP NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "credit_reservations";

-- DropTable
DROP TABLE "credits_ledger";

-- DropTable
DROP TABLE "credits_wallet";

-- DropTable
DROP TABLE "jobs";

-- DropEnum
DROP TYPE "CreditAction";

-- DropEnum
DROP TYPE "CreditType";

-- DropEnum
DROP TYPE "JobStatus";

-- DropEnum
DROP TYPE "ReservationStatus";

-- DropEnum
DROP TYPE "Role";
