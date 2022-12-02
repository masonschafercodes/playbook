import { getSession } from 'next-auth/react';
import { APISettings } from '~/components/APISettings';
import { prisma } from '~/utils/prisma';
import { requireAuth } from '~/utils/requireAuth';

export const getServerSideProps = requireAuth(async (ctx) => {
  const session = await getSession(ctx);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
    select: {
      name: true,
      email: true,
      id: true,
    },
  });

  const hasAPIKey = await prisma.apiKey.findUnique({
    where: {
      userId: session?.user.id,
    },
  });

  return {
    props: {
      user,
      hasAPIKey: !!hasAPIKey,
    },
  };
});

export default APISettings;
