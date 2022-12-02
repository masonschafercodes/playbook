// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verify } from 'argon2';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserIDFromToken } from '~/utils/IDFromToken';
import { prisma } from '~/utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
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
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.status(200).json({ userID: userID });
}
