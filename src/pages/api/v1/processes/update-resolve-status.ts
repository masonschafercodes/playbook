import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { prisma } from '~/utils/prisma';
import { nextAuthConfig } from '../../auth/[...nextauth]';

type ResolveUpdateResponse = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResolveUpdateResponse>) {
  const { commentId } = req.query;
  const { status } = req.body;
  const session = await unstable_getServerSession(req, res, nextAuthConfig);

  if (!session) {
    // set WWW-Authenticate header
    res.setHeader('WWW-Authenticate', 'Bearer realm = "api"');
    return res.status(401).end();
  }

  try {
    await prisma.processComment.update({
      where: {
        id: commentId as string,
      },
      data: {
        isResolved: status,
      },
    });

    res.status(200).json({ message: 'success' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
