-- CreateTable
CREATE TABLE "gpt_advice" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "opponent_user_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "gpt_advice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gpt_advice_user_id_opponent_user_id_key" ON "gpt_advice"("user_id", "opponent_user_id");

-- AddForeignKey
ALTER TABLE "gpt_advice" ADD CONSTRAINT "gpt_advice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gpt_advice" ADD CONSTRAINT "gpt_advice_opponent_user_id_fkey" FOREIGN KEY ("opponent_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gpt_advice" ADD CONSTRAINT "gpt_advice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
