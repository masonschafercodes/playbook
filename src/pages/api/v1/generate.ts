import { hash } from 'argon2';
import { createHmac } from 'crypto';
import { uuid } from 'uuidv4';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: 'Could not generate a key' });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      APIKey: true,
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'Could not generate a key' });
  }

  if (user.APIKey) {
    await prisma.apiKey.delete({
      where: {
        id: user.APIKey.id,
      },
    });
  }

  const hexServerKey = new Buffer(process.env.API_SERVER_SECRET as string, 'hex');

  const randomUUID = uuid();
  const signedHMACDetail = createHmac('sha256', hexServerKey).update(randomUUID).digest('hex');

  // userID to base64
  const userID = Buffer.from(id).toString('base64url');

  const fullKey = `pbk_${userID}.${signedHMACDetail}`;

  const hashedKey = await hash(fullKey);

  await prisma.apiKey.create({
    data: {
      secret: hashedKey,
      name: 'Default',
      user: {
        connect: {
          id: id,
        },
      },
    },
  });

  return res.status(200).json({ key: fullKey });
}

// API REQUEST -> key looks like: dpk_Y2xhdHpkNzJ4MDAwMnNkZXVreHpqb21oZA.9a1fabcd1fa3743bdda3e7733e647394c8a738aaad43723dd156247387538516
// We get user ID from the key
// we look up the user in the database to get the hashed key
// we compare the hashed key with the key we got from the request
// if they match, then we execute the api request
