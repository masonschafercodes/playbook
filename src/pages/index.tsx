import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { Login } from '~/components/Login';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
