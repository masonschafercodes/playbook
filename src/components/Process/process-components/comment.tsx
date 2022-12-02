import { Avatar, Checkbox, Code, Flex, Text, Tooltip } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ProcessComment } from '@prisma/client';
import { IconMessage } from '@tabler/icons';
import React from 'react';
import { KeyedMutator } from 'swr';
import { SoloProcessResponse } from '~/pages/api/v1/processes/solo';
import { timeSince } from '~/utils/timeSince';

interface CommentProps {
  comment: ProcessComment & {
    user: {
      image: string | null;
      id: string;
      name: string | null;
    };
  };
  mutate: KeyedMutator<SoloProcessResponse>;
}

export default function Comment(props: CommentProps) {
  const [resolved, setResolved] = React.useState(props.comment.isResolved);

  const handleUpdateResolved = async (checkStatus: boolean) => {
    setResolved(checkStatus);

    const response = await fetch(`/api/v1/processes/update-resolve-status?commentId=${props.comment.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: checkStatus,
      }),
    });

    if (!response.ok) {
      const data = await response.json();

      setResolved(!checkStatus);
      return console.error(data);
    } else {
      showNotification({
        title: 'Success',
        message: 'Comment status updated',
        color: 'gray.6',
        icon: <IconMessage size={14} />,
      });

      return props.mutate();
    }
  };

  return (
    <Flex direction="column" gap="md">
      <Flex direction="row" align="center" justify="space-between" gap="sm">
        {props.comment.user.image ? (
          <Avatar src={props.comment.user.image} radius="xl" size="sm" />
        ) : (
          <Avatar color="grape.2" radius="xl" size="sm">
            {props.comment.user.name?.charAt(0)}
          </Avatar>
        )}
        <Tooltip label={props.comment.isResolved ? 'Resolved' : 'Resolve'}>
          <Checkbox color="gray.6" size="sm" checked={resolved} onChange={(e) => handleUpdateResolved(e.currentTarget.checked)} />
        </Tooltip>
      </Flex>
      <Flex gap="sm" align="center" justify="start">
        <Text color="gray.1" fw="bold" size="sm">
          {props.comment.user.name}
        </Text>
        <Text color="gray.6" size="sm">
          {timeSince(new Date(props.comment.createdAt))}
        </Text>
      </Flex>
      <Text color="gray.6" size="sm">
        {props.comment.commentBody}
      </Text>
    </Flex>
  );
}
