/*
  Warnings:

  - You are about to drop the `_DataSearchToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `data_search` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `data_search_result` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DataSearchToTag" DROP CONSTRAINT "_DataSearchToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_DataSearchToTag" DROP CONSTRAINT "_DataSearchToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "data_search" DROP CONSTRAINT "data_search_user_id_fkey";

-- DropForeignKey
ALTER TABLE "data_search_result" DROP CONSTRAINT "data_search_result_data_search_id_fkey";

-- DropTable
DROP TABLE "_DataSearchToTag";

-- DropTable
DROP TABLE "data_search";

-- DropTable
DROP TABLE "data_search_result";

-- CreateTable
CREATE TABLE "process" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProcessToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProcessToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProcessToTag_AB_unique" ON "_ProcessToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProcessToTag_B_index" ON "_ProcessToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProcessToUser_AB_unique" ON "_ProcessToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProcessToUser_B_index" ON "_ProcessToUser"("B");

-- AddForeignKey
ALTER TABLE "_ProcessToTag" ADD CONSTRAINT "_ProcessToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcessToTag" ADD CONSTRAINT "_ProcessToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcessToUser" ADD CONSTRAINT "_ProcessToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcessToUser" ADD CONSTRAINT "_ProcessToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
