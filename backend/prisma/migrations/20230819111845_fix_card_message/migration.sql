/*
  Warnings:

  - Added the required column `message` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "message" TEXT NOT NULL;
