import { Tag } from '@prisma/client';
import { verify } from 'argon2';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserIDFromToken } from '~/utils/IDFromToken';
import { prisma } from '~/utils/prisma';
import rateLimit from '~/utils/rate-limit';

type TagResponse = {
  tags: Tag[];
};

type UnAuthorizedResponse = {
  message: string;
};

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<TagResponse | UnAuthorizedResponse>) {
  const token = req.headers.authorization?.split(' ')[1];
  const { teamId } = req.query;

  if (!token) {
    res.setHeader('WWW-Authenticate', 'Bearer realm = "api"');
    return res.status(401).end();
  }

  const userID = getUserIDFromToken(token);

  const apiLookup = await prisma.apiKey.findUnique({
    where: {
      userId: userID,
    },
  });

  if (!apiLookup) {
    return res.status(404).json({ message: 'API key not found' });
  }

  const apiSecret = apiLookup.secret;

  const isValid = await verify(apiSecret, token);

  if (!isValid) {
    res.setHeader('WWW-Authenticate', 'Bearer realm = "api"');
    return res.status(401).end();
  }

  try {
    await limiter.check(res, 10, token);
    const tags = await prisma.tag.findMany({
      where: {
        teamId: teamId as string,
      },
    });

    return res.status(200).json({ tags: tags });
  } catch (error) {
    return res.status(429).json({ message: 'Rate limit exceeded' });
  }
}
