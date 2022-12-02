import { Tag } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { prisma } from '~/utils/prisma';
import { nextAuthConfig } from '../../auth/[...nextauth]';

export type TagsResponse = {
  tags: Tag[];
};

type TagsErrorResposne = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<TagsResponse | TagsErrorResposne>) {
  const session = await unstable_getServerSession(req, res, nextAuthConfig);
  const { teamId } = req.query;

  if (!session) {
    res.setHeader('WWW-Authenticate', 'Bearer realm = "api"');
    return res.status(401).end();
  }

  try {
    const tags = await prisma.tag.findMany({
      where: {
        teamId: teamId as string,
      },
    });

    res.status(200).json({ tags });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
