/*
  Warnings:

  - You are about to drop the column `sub_total_price` on the `dtransaction` table. All the data in the column will be lost.
  - Added the required column `price` to the `dtransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dtransaction" DROP COLUMN "sub_total_price",
ADD COLUMN     "price" INTEGER NOT NULL;
