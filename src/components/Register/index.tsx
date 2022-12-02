import { Center, Box, TextInput, Group, Button, Anchor, Text, Notification, Alert, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import React from 'react';
import Router from 'next/router';
import { IconAlertCircle, IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

export function Register() {
  const [registerError, setRegisterError] = React.useState('');
  const registerForm = useForm({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 5 ? null : 'Password must be at least 6 characters long'),
      name: (value) => (value.length > 2 ? null : 'Name must be at least 3 characters long'),
    },
  });

  const handleRegister = async (email: string, password: string, name: string) => {
    const res = await fetch('/api/v1/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      showNotification({
        title: 'Error',
        message: data.message,
        color: 'red',
        icon: <IconAlertCircle />,
      });
      return;
    }

    Router.push('/');
  };

  return (
    <>
      <Center sx={{ height: '100vh', maxWidth: '100%', overflow: 'hidden' }}>
        <Box sx={{ minWidth: 300 }} mx="auto">
          <Text size="xl" weight={500} mb="md">
            Register to PlaybookNow
          </Text>
          <form
            onSubmit={registerForm.onSubmit((values) => handleRegister(values.email, values.password, values.name))}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <TextInput withAsterisk label="Email" placeholder="your@email.com" {...registerForm.getInputProps('email')} />

            <TextInput withAsterisk label="Name" placeholder="John Doe" {...registerForm.getInputProps('name')} />

            <PasswordInput
              placeholder="Password"
              label="Password"
              description="Password must include at least one letter, number and special character"
              {...registerForm.getInputProps('password')}
              withAsterisk
            />

            <Group position="right" mt="md" sx={{ minWidth: '100%' }}>
              <Button type="submit" variant="light" color="blue" w="100%">
                Register
              </Button>
            </Group>
            <Group mt="md" position="center">
              <Link href="/">
                <Anchor component="button" type="button" color="light">
                  Already have an Account? Login.
                </Anchor>
              </Link>
            </Group>
          </form>
        </Box>
      </Center>
    </>
  );
}
