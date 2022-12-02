import { Box, Checkbox, Flex, Text } from '@mantine/core';
import { ProcessComment, ProcessStep } from '@prisma/client';
import React from 'react';
import { KeyedMutator } from 'swr';
import { SoloProcessResponse } from '~/pages/api/v1/processes/solo';
import CommentsDrawer from './comments-drawer';

interface Props {
  step:
    | (ProcessStep & {
        processComments: (ProcessComment & {
          user: {
            image: string | null;
            id: string;
            name: string | null;
          };
        })[];
      })
    | undefined;
  mutate: KeyedMutator<SoloProcessResponse>;
}

export default function ProcessStepCard(props: Props) {
  return (
    <Box
      p="lg"
      w="100%"
      bg="gray.9"
      sx={{
        borderRadius: 5,
        border: '1px solid #4b5157',
      }}
    >
      <Flex direction="row" align="start" justify="space-between">
        <Flex direction="row" align="start" justify="start" gap="sm" w="50%">
          <Checkbox color="grape" size="md" checked={props.step?.completedAt ? true : false} />
          <Flex direction="column" gap="md">
            <Text color="gray.1" fw="bold" size="md">
              {props.step?.processStepName}
            </Text>
            {props.step?.completedAt ? (
              <Text color="gray.6" size="sm">
                Completed On <strong>{new Date(props.step?.completedAt).toLocaleDateString()}</strong>
              </Text>
            ) : (
              <Text color="gray.6" size="sm" fw="bold" fs="italic">
                Not Completed Yet
              </Text>
            )}
            {props.step?.processStepDetail ? (
              <Text color="gray.6" size="sm">
                {props.step?.processStepDetail}
              </Text>
            ) : (
              <Text color="gray.6" size="sm">
                No details provided
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex direction="row" align="center" justify="end" gap={5} w="50%">
          <Text>{props.step ? props.step.processComments.length : '0'}</Text>
          <CommentsDrawer
            key={props.step?.id}
            comments={props.step ? props.step.processComments : []}
            mutate={props.mutate}
            processStepId={props.step?.id}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
