/*
  Warnings:

  - You are about to drop the column `search_data` on the `data_search` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "data_search" DROP COLUMN "search_data";

-- CreateTable
CREATE TABLE "data_search_result" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "data_search_id" TEXT NOT NULL,

    CONSTRAINT "data_search_result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DataSearchToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DataSearchToTag_AB_unique" ON "_DataSearchToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_DataSearchToTag_B_index" ON "_DataSearchToTag"("B");

-- AddForeignKey
ALTER TABLE "data_search_result" ADD CONSTRAINT "data_search_result_data_search_id_fkey" FOREIGN KEY ("data_search_id") REFERENCES "data_search"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataSearchToTag" ADD CONSTRAINT "_DataSearchToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "data_search"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataSearchToTag" ADD CONSTRAINT "_DataSearchToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
