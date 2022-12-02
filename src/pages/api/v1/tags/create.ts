import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { prisma } from '~/utils/prisma';
import { nextAuthConfig } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, nextAuthConfig);
  const { tagName }: { tagName: string } = req.body;
  const { teamId } = req.query;

  if (!session) {
    res.setHeader('WWW-Authenticate', 'Bearer realm = "api"');
    return res.status(401).end();
  }

  if (!tagName) {
    res.status(400).json({ message: 'Missing Tag Name' });
  }

  const tags = await prisma.tag.findMany({
    where: {
      teamId: teamId as string,
      AND: {
        name: tagName.toLowerCase(),
      },
    },
  });

  if (tags.length > 0) {
    res.status(400).json({ message: 'Tag already exists' });
  }

  const tag = await prisma.tag.create({
    data: {
      name: tagName.toLowerCase(),
      teamId: teamId as string,
    },
  });

  res.status(200).json(tag);
}
