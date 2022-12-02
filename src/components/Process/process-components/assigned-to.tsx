import { Avatar, Flex, Text } from '@mantine/core';
import React from 'react';

interface Props {
  assignees:
    | {
        name: string | null;
        id: string;
        image: string | null;
      }[]
    | undefined;
}

export default function AssignedTo(props: Props) {
  return (
    <Flex gap="md" align="center">
      <Avatar.Group spacing="sm">
        {props.assignees?.map((assignee) => (
          <>
            {assignee.image ? (
              <Avatar src={assignee.image} radius="xl" />
            ) : (
              <Avatar color="grape.2" radius="xl">
                {assignee.name?.charAt(0)}
              </Avatar>
            )}
          </>
        ))}
      </Avatar.Group>
      <Flex direction="column">
        <Text color="gray.1" fw="bold" size="sm">
          Assigned To
        </Text>
        <Text color="gray.1" size="sm">
          {props.assignees &&
            props.assignees?.map((assignee) => (
              <>
                {assignee.name}
                {props.assignees?.indexOf(assignee) !== props.assignees!.length - 1 ? ', ' : ''}
              </>
            ))}
        </Text>
      </Flex>
    </Flex>
  );
}
