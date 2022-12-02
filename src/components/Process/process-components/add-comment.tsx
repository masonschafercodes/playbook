import { TextInput, Button, Group } from '@mantine/core';
import React from 'react';
import { KeyedMutator } from 'swr';
import { SoloProcessResponse } from '~/pages/api/v1/processes/solo';

interface AddCommentProps {
  mutate: KeyedMutator<SoloProcessResponse>;
  processStepId: string | undefined;
}

export default function AddComment(props: AddCommentProps) {
  const [text, setText] = React.useState('');

  const handleAddComment = async () => {
    if (text.length === 0) {
      return;
    }

    const response = await fetch(`/api/v1/processes/add-comment?processStepId=${props.processStepId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentBody: text,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return console.error(data);
    }

    setText('');
    return props.mutate();
  };

  return (
    <Group w="100%">
      <TextInput w="80%" placeholder="Add a comment" value={text} onChange={(e) => setText(e.target.value)} />
      <Button color="gray" variant="outline" onClick={handleAddComment}>
        Add
      </Button>
    </Group>
  );
}
