import { Code, Flex, Loader, Text } from '@mantine/core';
import { IconTemplate } from '@tabler/icons';
import React from 'react';
import useSWR from 'swr';
import ActionMenuButton from '~/components/Dashboard/processes-components/ActionMenuButton';
import ProcessCard from '~/components/UI/processes/ProcessCard';
import { ProcessTemplateResponse } from '~/pages/api/v1/process-templates';
import fetcher from '~/utils/SWRFetcher';

interface TemplateCardProps {
  teamId: string;
}

export default function TemplateCards(props: TemplateCardProps) {
  const { data, error } = useSWR<ProcessTemplateResponse>(`/api/v1/process-templates?teamId=${props.teamId}`, fetcher);
  return (
    <>
      <Flex direction="row" align="center" justify="space-between" mb="1rem" w="100%">
        <Text size="xl" fw="bold">
          Processes
        </Text>
        <ActionMenuButton iconLeft={<IconTemplate size={14} />} text="Create a new Template" onClick={() => null} />
      </Flex>
      {error || !data ? (
        <Loader mt="md" color="gray" size="sm" variant="bars" />
      ) : (
        <>
          <Flex direction="column" gap="md" justify="center" w="100%">
            <Code block>{JSON.stringify(data, null, 2)}</Code>
          </Flex>
        </>
      )}
    </>
  );
}
