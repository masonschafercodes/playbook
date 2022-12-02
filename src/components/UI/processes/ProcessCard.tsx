import { Avatar, Badge, Box, Flex, Text } from '@mantine/core';
import { ProcessComment, ProcessStep, Tag } from '@prisma/client';
import { IconMessage, IconUser } from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';

type AssigneeRestrictedType = {
  name: string | null;
  id: string;
  image: string | null;
};

interface ProcessCardProps {
  proccessName: string;
  processDetail?: string | null;
  processId: string;
  assignees?: AssigneeRestrictedType[] | null;
  processStepsWithComments: (ProcessStep & {
    processComments: ProcessComment[];
  })[];
  tags: Tag[];
}

function getNextUnCompletedTask(
  processSteps: (ProcessStep & {
    processComments: ProcessComment[];
  })[]
) {
  const unCompletedTask = processSteps.find((step) => step.completedAt === null);
  return unCompletedTask ? unCompletedTask.processStepName : 'All tasks completed';
}

function getCountOfCompletedTasks(
  processSteps: (ProcessStep & {
    processComments: ProcessComment[];
  })[]
) {
  return processSteps.filter((step) => step.completedAt !== null).length;
}

export default function ProcessCard(props: ProcessCardProps) {
  const router = useRouter();
  return (
    <Box
      p="lg"
      w="100%"
      bg="gray.9"
      sx={{
        borderRadius: 5,
        border: '1px solid #4b5157',
        ':hover': { cursor: 'pointer', borderColor: 'rgba(238, 190, 250, .6)' },
      }}
      onClick={() => router.push(`/dashboard/process/${props.processId}`)}
    >
      <Flex direction="row" align="start" justify="space-between">
        <Flex direction="row" align="start" justify="start" gap="sm" w="50%">
          {props.assignees && props.assignees?.length > 1 ? (
            <Avatar
              color="grape.2"
              radius="xl"
              sx={{ display: 'flex', gap: '0.1rem', alignItems: 'center', justifyContent: 'center' }}
            >
              <IconUser size={13} />
              <Text size="sm">{props.assignees?.length}</Text>
            </Avatar>
          ) : (
            <>
              {props.assignees?.[0]?.image ? (
                <Avatar src={props.assignees?.[0]?.image} alt="it's me" radius="xl" />
              ) : (
                <Avatar radius="xl" color="grape.1">
                  <IconUser size={16} />
                </Avatar>
              )}
            </>
          )}
          <Flex direction="column" gap="md">
            <Text color="gray.1" fw="bold" size="md">
              {props.proccessName}
            </Text>
            <Text color="gray.1" size="sm" fs="italic" sx={{ display: 'flex', gap: '0.3rem' }}>
              <Text fw="bold" fs="normal" color="gray.6">
                Up Next:
              </Text>
              {getNextUnCompletedTask(props.processStepsWithComments)}
            </Text>
            <Flex direction="row" gap="md" sx={{ display: 'flex', gap: '0.3rem' }}>
              {props.tags.length > 0 ? (
                props.tags.map((tag) => (
                  <Badge key={tag.id} color="grape.1" size="md" radius="sm">
                    {tag.name}
                  </Badge>
                ))
              ) : (
                <Badge color="blue.1" size="md" radius="sm">
                  No tags
                </Badge>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" gap="md" w="50%" align="flex-end">
          <Text color="gray.6" fw="bold" sx={{ textAlign: 'right', display: 'flex', gap: '0.3rem' }}>
            {getCountOfCompletedTasks(props.processStepsWithComments)}/{props.processStepsWithComments.length}
            <Text color="gray.1">Tasks Completed</Text>
          </Text>
          <Text color="gray.4" size="sm" sx={{ display: 'flex', gap: '0.3rem' }}>
            <Text fw="bold" color="gray.6">
              Due on
            </Text>
            {new Date().toLocaleDateString()}
          </Text>
          <Flex direction="row" gap="md" align="center" justify="flex-end">
            <IconMessage size={16} />
            <Text color="gray.6" fw="bold">
              {props.processStepsWithComments.reduce((acc, step) => acc + step.processComments.length, 0)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
