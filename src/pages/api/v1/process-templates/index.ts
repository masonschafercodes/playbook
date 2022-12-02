import { ProcessTemplate } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/utils/prisma';

export type ProcessTemplateResponse = {
  templates: ProcessTemplate[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ProcessTemplateResponse>) {
  const { teamId } = req.query;

  const templates = await prisma.processTemplate.findMany({
    where: {
      teamId: teamId as string,
    },
    include: {
      ProcessSteps: true,
      Tags: true,
    },
  });

  res.status(200).json({ templates });
}
