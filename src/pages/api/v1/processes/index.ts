import { Process, ProcessComment, ProcessStep, Tag } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { prisma } from '~/utils/prisma';
import { nextAuthConfig } from '../../auth/[...nextauth]';

export type GetAllProcessesResponse = {
  processes: (Process & {
    Tags: Tag[];
    assignees: {
      name: string | null;
      id: string;
      image: string | null;
    }[];
    ProcessSteps: (ProcessStep & {
      processComments: ProcessComment[];
    })[];
  })[];
};

type RequestError = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<GetAllProcessesResponse | RequestError>) {
  const { teamId } = req.query;
  const session = await unstable_getServerSession(req, res, nextAuthConfig);

  if (!session) {
    res.setHeader('WWW-Authenticate', 'Bearer realm = "api"');
    return res.status(401).end();
  }

  const processes = await prisma.process.findMany({
    where: {
      teamId: teamId as string,
      AND: {
        assignees: {
          some: {
            id: session.user.id,
          },
        },
      },
    },
    include: {
      assignees: {
        select: {
          name: true,
          id: true,
          image: true,
        },
        orderBy: {
          name: 'asc',
        },
      },
      ProcessSteps: {
        include: {
          processComments: true,
        },
      },
      Tags: true,
    },
  });

  return res.status(200).json({ processes: processes });
}
