// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { hash } from 'argon2';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: 'Missing Email or Password or Name' });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(400).json({ message: 'Could not create account.' });
  }

  await prisma.user.create({
    data: {
      email,
      password: await hash(password),
      name,
    },
  });

  res.status(200).json({ message: 'Account created successfully.' });
}
