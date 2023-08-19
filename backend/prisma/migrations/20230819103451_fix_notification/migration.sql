/*
  Warnings:

  - You are about to drop the column `resource_id` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `resource_type` on the `notification` table. All the data in the column will be lost.
  - Added the required column `pairing_id` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification" DROP COLUMN "resource_id",
DROP COLUMN "resource_type",
ADD COLUMN     "pairing_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_pairing_id_fkey" FOREIGN KEY ("pairing_id") REFERENCES "pairing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
