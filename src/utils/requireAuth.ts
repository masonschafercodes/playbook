import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { nextAuthConfig } from '~/pages/api/auth/[...nextauth]';

export const requireAuth = (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(ctx.req, ctx.res, nextAuthConfig);

  if (!session) {
    return {
      redirect: {
        destination: '/', // login path
        permanent: false,
      },
    };
  }

  return await func(ctx);
};
