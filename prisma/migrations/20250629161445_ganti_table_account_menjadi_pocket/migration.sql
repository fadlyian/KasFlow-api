/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PocketType" AS ENUM ('Bank', 'e_wallet', 'cash');

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropEnum
DROP TYPE "AccountType";

-- CreateTable
CREATE TABLE "pockets" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PocketType" NOT NULL,
    "initial_balance" DECIMAL(65,30) NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "pockets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pockets" ADD CONSTRAINT "pockets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
