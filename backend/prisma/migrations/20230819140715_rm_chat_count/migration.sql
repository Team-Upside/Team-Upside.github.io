/*
  Warnings:

  - You are about to drop the column `new_messages_count` on the `chat_room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chat_room" DROP COLUMN "new_messages_count";
