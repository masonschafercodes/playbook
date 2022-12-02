import { Drawer, ActionIcon, Text, Flex, Group, Button, Tooltip, ScrollArea, TextInput } from '@mantine/core';
import { ProcessComment } from '@prisma/client';
import { IconFlag, IconMessage } from '@tabler/icons';
import React from 'react';
import { KeyedMutator } from 'swr';
import { SoloProcessResponse } from '~/pages/api/v1/processes/solo';
import AddComment from './add-comment';
import Comment from './comment';

interface Props {
  comments: (ProcessComment & {
    user: {
      image: string | null;
      id: string;
      name: string | null;
    };
  })[];
  mutate: KeyedMutator<SoloProcessResponse>;
  processStepId: string | undefined;
}

export default function CommentsDrawer(props: Props) {
  const [opened, setOpened] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  return (
    <>
      <Drawer opened={opened} onClose={() => setOpened(false)} title="Comments" padding="xl" size="xl" position="right">
        <Group>
          <Button
            color="gray"
            variant={tab === 0 ? 'outline' : 'light'}
            leftIcon={<IconMessage size={14} />}
            onClick={() => setTab(0)}
          >
            All
          </Button>
          <Button
            color="gray"
            variant={tab === 1 ? 'outline' : 'light'}
            leftIcon={<IconFlag size={14} />}
            onClick={() => setTab(1)}
          >
            Unresolved
          </Button>
        </Group>

        {tab === 0 && (
          <Flex direction="column" gap="md" pt="xl" key="tab0">
            {props.comments.length > 0 ? (
              <>
                <ScrollArea.Autosize maxHeight="80vh" sx={{ minHeight: '80vh' }} type="never">
                  <Flex direction="column" gap="md" pt="xl">
                    {props.comments.map((comment) => (
                      <Comment key={comment.id} comment={comment} mutate={props.mutate} />
                    ))}
                  </Flex>
                </ScrollArea.Autosize>
              </>
            ) : (
              <Flex sx={{ minHeight: '80vh' }}>
                <Text color="gray.6" size="sm">
                  No comments yet
                </Text>
              </Flex>
            )}
            <AddComment mutate={props.mutate} processStepId={props.processStepId} />
          </Flex>
        )}

        {tab === 1 && (
          <Flex direction="column" gap="md" pt="xl" key="tab1">
            {props.comments.filter((comment) => comment.isResolved === false).length > 0 ? (
              <>
                <ScrollArea.Autosize maxHeight="80vh" sx={{ minHeight: '80vh' }} type="never">
                  <Flex direction="column" gap="md" pt="xl">
                    {props.comments
                      .filter((comment) => comment.isResolved === false)
                      .map((comment) => (
                        <Comment key={comment.id} comment={comment} mutate={props.mutate} />
                      ))}
                  </Flex>
                </ScrollArea.Autosize>
              </>
            ) : (
              <Flex sx={{ minHeight: '80vh' }}>
                <Text color="gray.6" size="sm">
                  No unresolved comments
                </Text>
              </Flex>
            )}
            <AddComment mutate={props.mutate} processStepId={props.processStepId} />
          </Flex>
        )}
      </Drawer>
      <Tooltip label="Comments" position="top-start">
        <ActionIcon radius="xl" color="grape.1" variant="light" onClick={() => setOpened(true)}>
          <IconMessage size={18} />
        </ActionIcon>
      </Tooltip>
    </>
  );
}
