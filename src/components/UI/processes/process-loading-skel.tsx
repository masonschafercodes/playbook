import { Flex, Skeleton } from '@mantine/core';
import React from 'react';

export default function ProcessLoadingSkeleton() {
  return (
    <Flex direction="column" gap="md" justify="center" w="100%">
      <Skeleton height={150} radius="md" />
      <Skeleton height={150} radius="md" />
      <Skeleton height={150} radius="md" />
    </Flex>
  );
}
