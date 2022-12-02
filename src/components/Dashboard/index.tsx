import { Flex, Loader, Text } from '@mantine/core';
import { IconTemplate } from '@tabler/icons';
import React from 'react';
import useSWR from 'swr';
import { GetAllProcessesResponse } from '~/pages/api/v1/processes';
import fetcher from '~/utils/SWRFetcher';
import ProcessLoadingSkeleton from '../UI/processes/process-loading-skel';
import ProcessCard from '../UI/processes/ProcessCard';
import { PrismShell } from '../UI/shell-components/PrismShell';
import ActionMenuButton from './processes-components/ActionMenuButton';
import ProcessSearch from './processes-components/process-search';

export function Dashboard({ user, teamId }: any) {
  const { data, error } = useSWR<GetAllProcessesResponse>(`/api/v1/processes?teamId=${teamId}`, fetcher);
  const [search, setSearch] = React.useState('');

  if (error) return <div>failed to load</div>;

  return (
    <>
      <PrismShell user={user}>
        <Flex direction="row" align="center" justify="space-between" mb="1rem" w="100%" gap="lg">
          <Text size="xl" fw="bold">
            Processes
          </Text>
          <ProcessSearch disabled={error || !data} search={search} setSearch={setSearch} />
          <ActionMenuButton iconLeft={<IconTemplate size={14} />} text="Deploy a new Process" onClick={() => null} />
        </Flex>
        {error || !data ? (
          <ProcessLoadingSkeleton />
        ) : (
          <>
            <Flex direction="column" gap="md" justify="center" w="100%">
              {data.processes
                .filter((item) => item.processName.toLowerCase().includes(search.toLowerCase()))
                .map((process) => (
                  <ProcessCard
                    proccessName={process.processName}
                    tags={process.Tags}
                    assignees={process.assignees}
                    processDetail={process.processDetail}
                    processId={process.id}
                    processStepsWithComments={process.ProcessSteps}
                    key={process.id}
                  />
                ))}
            </Flex>
          </>
        )}
      </PrismShell>
    </>
  );
}
