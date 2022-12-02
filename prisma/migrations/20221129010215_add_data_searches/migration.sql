-- CreateTable
CREATE TABLE "data_search" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "search_data" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "data_search_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "data_search" ADD CONSTRAINT "data_search_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
