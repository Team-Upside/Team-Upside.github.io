/*
  Warnings:

  - Added the required column `price` to the `gpt_advice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gpt_advice" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
