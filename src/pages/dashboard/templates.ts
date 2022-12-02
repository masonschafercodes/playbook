import { getSession } from 'next-auth/react';
import { prisma } from '~/utils/prisma';
import { requireAuth } from '~/utils/requireAuth';
import Templates from '~/components/Templates';

export const getServerSideProps = requireAuth(async (ctx) => {
  const session = await getSession(ctx);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
    select: {
      name: true,
      email: true,
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

export default Templates;
