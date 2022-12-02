import React from 'react';
import { Text, Center, Box, Group, Button } from '@mantine/core';
import ErrorModelComponent from '~/components/3DModel/404Model';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons';

export default function Custom404() {
  return (
    <Center sx={{ height: '100vh', maxWidth: '100%', overflow: 'hidden' }}>
      <Box sx={{ minWidth: 300 }} mx="auto">
        <ErrorModelComponent />
        <Text align="center" size="xl" weight={500} mb="md">
          Uh Oh! This page doesn&lsquo;t exist.
        </Text>
        <Group mt="md" position="center">
          <Link href="/dashboard">
            <Button color="yellow" variant="light" leftIcon={<IconArrowLeft />}>
              Looks Like You&lsquo;re Lost. Click Here to Go Home.
            </Button>
          </Link>
        </Group>
      </Box>
    </Center>
  );
}
