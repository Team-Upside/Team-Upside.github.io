/*
  Warnings:

  - The primary key for the `user_card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_card" DROP CONSTRAINT "user_card_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "user_card_pkey" PRIMARY KEY ("user_id", "card_id");
