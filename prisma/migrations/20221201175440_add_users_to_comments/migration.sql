/*
  Warnings:

  - Added the required column `user_id` to the `process_comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "process_comment" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "process_comment" ADD CONSTRAINT "process_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
