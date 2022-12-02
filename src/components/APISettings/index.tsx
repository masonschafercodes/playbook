import { ActionIcon, Box, Button, Code, CopyButton, Group, Text, Tooltip } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle, IconCheck, IconCopy } from '@tabler/icons';
import React from 'react';
import { PrismShell } from '../UI/shell-components/PrismShell';

export function APISettings({ user, hasAPIKey }: any) {
  const [apiKey, setApiKey] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleGenerateAPIKey = async () => {
    setLoading(true);
    const res = await fetch('/api/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
      }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      setLoading(false);
      return showNotification({
        title: 'Error',
        message: data.message,
        color: 'red',
        icon: <IconAlertCircle />,
      });
    }

    const key = data.key;

    setApiKey(key);
    setLoading(false);
  };

  return (
    <PrismShell user={user}>
      <Text size="xl" fw="bold">
        API Settings
      </Text>
      {hasAPIKey ? (
        <Box
          sx={{
            maxWidth: '72rem',
          }}
          mt="md"
          p="md"
        >
          <Text size="lg" fw="bold">
            You already have an API key! You can use it to access the Playbook API.
          </Text>
          <Text size="md" fw="normal">
            You can generate a new key at any time by clicking the button below.
          </Text>
          <Group mt="sm">
            <Button
              color="red"
              variant="light"
              onClick={handleGenerateAPIKey}
              disabled={apiKey !== ''}
              loading={loading}
              loaderPosition="center"
            >
              Generate New API key
            </Button>
          </Group>

          {apiKey !== '' && (
            <Group mt="xl">
              <Text size="lg" fw="bold" sx={{ gap: '1rem', alignItems: 'cener', display: 'flex' }}>
                This is the only time you will be able to see your API key. Make sure to save it somewhere safe!
                <CopyButton value={apiKey} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Text>
              <Code color="grape" sx={{ fontSize: 18 }}>
                {apiKey}
              </Code>
            </Group>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: '72rem',
          }}
          mt="md"
          p="md"
        >
          <Text size="md" fw="normal" fs="italic">
            You don&lsquo;t have an API key, you can generate one by clicking the button below.
          </Text>
          <Group mt="sm">
            <Button
              color="green"
              variant="light"
              onClick={handleGenerateAPIKey}
              disabled={apiKey !== ''}
              loading={loading}
              loaderPosition="center"
            >
              Generate API key
            </Button>
          </Group>
          {apiKey !== '' && (
            <Group mt="xl">
              <Text size="lg" fw="bold" sx={{ gap: '1rem', alignItems: 'cener', display: 'flex' }}>
                This is the only time you will be able to see your API key. Make sure to save it somewhere safe!
                <CopyButton value={apiKey} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Text>
              <Code color="grape" sx={{ fontSize: 18 }}>
                {apiKey}
              </Code>
            </Group>
          )}
        </Box>
      )}
    </PrismShell>
  );
}
