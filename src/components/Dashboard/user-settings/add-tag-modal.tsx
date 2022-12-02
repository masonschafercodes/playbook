import { Modal, Button, Group, TextInput, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { Tag } from '@prisma/client';
import { IconAlertCircle, IconHomeCancel, IconPencilPlus } from '@tabler/icons';
import React from 'react';
import useSWR from 'swr';
import fetcher from '~/utils/SWRFetcher';

interface Props {
  teamId: string;
}

export default function AddTagModal(props: Props) {
  const [opened, setOpened] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { mutate } = useSWR<Tag[]>(`/api/v1/users/tags?teamId=${props.teamId}`, fetcher);

  const newTagForm = useForm({
    initialValues: {
      tagName: '',
    },

    validate: {
      tagName: (value) => (value.length > 0 ? null : 'Tag name must be at least 1 character long'),
    },
  });

  const handleRegister = async (tagName: string) => {
    setLoading(true);
    const res = await fetch(`/api/v1/tags/create?teamId=${props.teamId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tagName,
      }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      setLoading(false);
      setOpened(false);
      newTagForm.reset();
      showNotification({
        title: 'Error',
        message: data.message,
        color: 'red',
        icon: <IconAlertCircle />,
      });
      return;
    }

    setLoading(false);
    setOpened(false);
    newTagForm.reset();
    mutate();
  };

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="New Tag" centered>
        <form onSubmit={newTagForm.onSubmit((values) => handleRegister(values.tagName))}>
          <Flex direction="column" gap="sm">
            <TextInput withAsterisk placeholder="Software" label="New Tag Name" {...newTagForm.getInputProps('tagName')} />
            <Flex gap="md" align="center" justify="center" sx={{ width: '100%' }}>
              <Button
                loading={loading}
                loaderPosition="center"
                leftIcon={<IconPencilPlus size={16} />}
                color="blue"
                variant="light"
                size="sm"
                type="submit"
                w="100%"
              >
                Add New Tag
              </Button>
              <Button
                leftIcon={<IconHomeCancel size={16} />}
                color="red"
                variant="light"
                size="sm"
                onClick={() => setOpened(false)}
                w="100%"
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </form>
      </Modal>

      <>
        <Button onClick={() => setOpened(true)} leftIcon={<IconPencilPlus size={16} />} color="blue" variant="light" size="sm">
          Add Tag
        </Button>
      </>
    </>
  );
}
