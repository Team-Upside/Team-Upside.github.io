/*
  Warnings:

  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pairing` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserCardStatus" AS ENUM ('APPROVED', 'IGNORED');

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_pairing_id_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "pairing" DROP CONSTRAINT "pairing_card_id_fkey";

-- DropForeignKey
ALTER TABLE "pairing" DROP CONSTRAINT "pairing_user_id_fkey";

-- DropTable
DROP TABLE "notification";

-- DropTable
DROP TABLE "pairing";

-- DropEnum
DROP TYPE "PairingStatus";

-- CreateTable
CREATE TABLE "user_card" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "card_id" INTEGER NOT NULL,
    "status" "UserCardStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_card" ADD CONSTRAINT "user_card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_card" ADD CONSTRAINT "user_card_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
