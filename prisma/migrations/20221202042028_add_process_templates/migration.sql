-- AlterTable
ALTER TABLE "process_step" ADD COLUMN     "processTemplateId" TEXT;

-- CreateTable
CREATE TABLE "process_template" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "processTemplateName" TEXT NOT NULL,
    "processTemplateDetail" TEXT,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "process_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProcessTemplateToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProcessTemplateToTag_AB_unique" ON "_ProcessTemplateToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProcessTemplateToTag_B_index" ON "_ProcessTemplateToTag"("B");

-- AddForeignKey
ALTER TABLE "process_step" ADD CONSTRAINT "process_step_processTemplateId_fkey" FOREIGN KEY ("processTemplateId") REFERENCES "process_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "process_template" ADD CONSTRAINT "process_template_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcessTemplateToTag" ADD CONSTRAINT "_ProcessTemplateToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "process_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcessTemplateToTag" ADD CONSTRAINT "_ProcessTemplateToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
