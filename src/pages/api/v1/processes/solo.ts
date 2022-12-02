import { Process, ProcessComment, ProcessStep, Tag } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { prisma } from '~/utils/prisma';
import { nextAuthConfig } from '../../auth/[...nextauth]';

export type SoloProcessResponse = {
  process:
    | (Process & {
        assignees: {
          image: string | null;
          id: string;
          name: string | null;
        }[];
        Tags: Tag[];
        ProcessSteps: (ProcessStep & {
          processComments: (ProcessComment & {
            user: {
              image: string | null;
              id: string;
              name: string | null;
            };
          })[];
        })[];
      })
    | null;
};

type RequestError = {
  message: string;
  stack: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SoloProcessResponse | RequestError>) {
  const { processId } = req.query;
  const session = await unstable_getServerSession(req, res, nextAuthConfig);

  if (!session) {
    // set WWW-Authenticate header
    res.setHeader('WWW-Authenticate', 'Bearer realm = "api"');
    return res.status(401).end();
  }

  try {
    const process = await prisma.process.findUnique({
      where: {
        id: processId as string,
      },
      include: {
        assignees: {
          select: {
            name: true,
            id: true,
            image: true,
          },
        },
        ProcessSteps: {
          include: {
            processComments: {
              include: {
                user: {
                  select: {
                    name: true,
                    id: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
        Tags: true,
      },
    });

    return res.status(200).json({ process });
  } catch (err: any) {
    return res.status(400).json({ message: 'Server Error', stack: err.stack });
  }
}
