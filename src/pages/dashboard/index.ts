import { getSession } from 'next-auth/react';
import { Dashboard } from '~/components/Dashboard';
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
      image: true,
      Teams: {
        select: {
          id: true,
        },
      },
    },
  });

  return {
    props: {
      user,
      teamId: user?.Teams[0].id,
    },
  };
});

export default Dashboard;
