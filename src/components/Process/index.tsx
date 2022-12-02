import { Flex, Code, Text, Loader } from '@mantine/core';
import { IconPencil } from '@tabler/icons';
import React from 'react';
import useSWR from 'swr';
import { SoloProcessResponse } from '~/pages/api/v1/processes/solo';
import fetcher from '~/utils/SWRFetcher';
import ActionMenuButton from '../Dashboard/processes-components/ActionMenuButton';
import { PrismShell } from '../UI/shell-components/PrismShell';
import AssignedTo from './process-components/assigned-to';

export default function Process({ user, processId }: any) {
  const { data, error } = useSWR<SoloProcessResponse>(`/api/v1/processes/solo?processId=${processId}`, fetcher);

  return (
    <PrismShell user={user}>
      <>
        {error || !data ? (
          <Loader mt="md" color="gray" size="sm" variant="bars" />
        ) : (
          <>
            <Flex direction="row" align="center" justify="space-between" mb="1rem" w="100%">
              <Text size="xl" fw="bold">
                {data.process?.processName}
              </Text>
              <ActionMenuButton iconLeft={<IconPencil size={14} />} text="Edit Process" onClick={() => null} />
            </Flex>
            <Flex direction="column" gap="md" justify="center" w="100%">
              <Text color="gray.6" size="sm" w="45%">
                {data.process?.processDetail}
              </Text>
              <AssignedTo assignees={data.process?.assignees} />
            </Flex>
          </>
        )}
      </>
    </PrismShell>
  );
}
