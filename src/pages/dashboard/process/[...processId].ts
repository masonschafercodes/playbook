import { getSession } from 'next-auth/react';
import { prisma } from '~/utils/prisma';
import { requireAuth } from '~/utils/requireAuth';
import Process from '~/components/Process';

export const getServerSideProps = requireAuth(async (ctx) => {
  const session = await getSession(ctx);
  const processId = ctx.params?.processId;

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

  return {
    props: {
      user,
      processId,
    },
  };
});

export default Process;
