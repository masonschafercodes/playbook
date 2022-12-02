/*
  Warnings:

  - You are about to drop the column `name` on the `process` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `process` table. All the data in the column will be lost.
  - Added the required column `processName` to the `process` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "process" DROP COLUMN "name",
DROP COLUMN "user_id",
ADD COLUMN     "processDetail" TEXT,
ADD COLUMN     "processName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "process_step" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),
    "processStepName" TEXT NOT NULL,
    "processStepDetail" TEXT,
    "process_id" TEXT NOT NULL,

    CONSTRAINT "process_step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "process_comment" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "commentBody" TEXT NOT NULL,
    "processStepId" TEXT,

    CONSTRAINT "process_comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "process_step" ADD CONSTRAINT "process_step_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "process_comment" ADD CONSTRAINT "process_comment_processStepId_fkey" FOREIGN KEY ("processStepId") REFERENCES "process_step"("id") ON DELETE SET NULL ON UPDATE CASCADE;
