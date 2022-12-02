-- CreateTable
CREATE TABLE "APIKey" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "secret" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "APIKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "APIKey_secret_key" ON "APIKey"("secret");

-- CreateIndex
CREATE UNIQUE INDEX "APIKey_user_id_key" ON "APIKey"("user_id");

-- AddForeignKey
ALTER TABLE "APIKey" ADD CONSTRAINT "APIKey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
