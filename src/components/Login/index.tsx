import { Box, TextInput, Checkbox, Group, Button, Text, Center, Anchor, Code, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons';
import Router from 'next/router';

export function Login() {
  const { data: session } = useSession();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 5 ? null : 'Password must be at least 6 characters long'),
    },
  });

  const handleLogin = async (email: string, password: string) => {
    const values = form.validate();

    if (!values) {
      return;
    }

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      Router.push('/dashboard');
    }

    if (res?.error) {
      if (res.error === 'CredentialsSignin') {
        showNotification({
          title: 'Error',
          message: 'Incorrect email or password',
          color: 'red',
          icon: <IconAlertCircle />,
        });
        return;
      } else {
        showNotification({
          title: 'Error',
          message: 'Something went wrong. Please try again later.',
          color: 'red',
          icon: <IconAlertCircle />,
        });
        return;
      }
    }
  };

  return (
    <Center sx={{ height: '100vh', maxWidth: '100%', overflow: 'hidden' }}>
      <Box sx={{ minWidth: 300 }} mx="auto">
        <Text size="xl" weight={500} mb="md">
          Login to PlaybookNow
        </Text>
        <form onSubmit={form.onSubmit((values) => handleLogin(values.email, values.password))}>
          <TextInput withAsterisk label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
          <PasswordInput
            placeholder="Password"
            label="Password"
            description="Password must include at least one letter, number and special character"
            {...form.getInputProps('password')}
            withAsterisk
          />

          <Group position="right" mt="md" sx={{ minWidth: '100%' }}>
            <Button type="submit" variant="light" color="blue" w="100%">
              Login
            </Button>
          </Group>
          <Group mt="md" position="center">
            <Link href="/register">
              <Anchor component="button" type="button" color="light">
                Don&lsquo;t have an account? Register Now.
              </Anchor>
            </Link>
          </Group>
        </form>
      </Box>
    </Center>
  );
}
