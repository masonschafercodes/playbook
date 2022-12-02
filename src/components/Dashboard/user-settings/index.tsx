import { Box, Button, Flex, Group, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons';
import React from 'react';
import { PrismShell } from '~/components/UI/shell-components/PrismShell';
import AddTagModal from './add-tag-modal';
import TagsGrid from './tags-grid';

export default function UserSettings({ user, teamId }: any) {
  return (
    <PrismShell user={user}>
      <Text size="xl" fw="bold">
        Team Settings
      </Text>
      <Box sx={{ maxWidth: '72rem' }} mt="md" p="md">
        <Text size="md" fw="bold">
          Tags
        </Text>
        <TagsGrid teamId={teamId} />
        <Group mt="md" spacing="lg">
          <AddTagModal teamId={teamId} />
          <Button leftIcon={<IconEdit size={16} />} color="red" variant="light" size="sm">
            Edit Tags
          </Button>
        </Group>
      </Box>
    </PrismShell>
  );
}
