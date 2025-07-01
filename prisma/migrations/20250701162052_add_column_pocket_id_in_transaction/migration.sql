/*
  Warnings:

  - Added the required column `pocketId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "pocketId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_pocketId_fkey" FOREIGN KEY ("pocketId") REFERENCES "pockets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
