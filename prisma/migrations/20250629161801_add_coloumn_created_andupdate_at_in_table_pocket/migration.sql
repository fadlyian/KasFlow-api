/*
  Warnings:

  - The values [Bank] on the enum `PocketType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updated_at` to the `pockets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PocketType_new" AS ENUM ('bank', 'e_wallet', 'cash');
ALTER TABLE "pockets" ALTER COLUMN "type" TYPE "PocketType_new" USING ("type"::text::"PocketType_new");
ALTER TYPE "PocketType" RENAME TO "PocketType_old";
ALTER TYPE "PocketType_new" RENAME TO "PocketType";
DROP TYPE "PocketType_old";
COMMIT;

-- AlterTable
ALTER TABLE "pockets" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
