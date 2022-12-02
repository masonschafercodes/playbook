import React from 'react';
import { IconChevronRight, IconChevronLeft, IconSettings, IconSearch, IconLogout } from '@tabler/icons';
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme, Menu } from '@mantine/core';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface UserInfoProps {
  name: string;
  email: string;
  image?: string;
}

export function UserInfo(props: UserInfoProps) {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
      }}
    >
      <Menu shadow="md" width={200} trigger="hover" position="right-end" openDelay={100} closeDelay={400}>
        <Menu.Target>
          <UnstyledButton
            sx={{
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

              '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              },
            }}
          >
            <Group>
              {props.image ? (
                <Avatar src={props.image} alt="it's me" radius="xl" />
              ) : (
                <Avatar radius="xl" color="grape.1">
                  {props.name[0]}
                </Avatar>
              )}

              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {props.name}
                </Text>
                <Text color="dimmed" size="xs">
                  {props.email}
                </Text>
              </Box>

              {theme.dir === 'ltr' ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Link href="/dashboard/settings" style={{ textDecoration: 'none' }}>
            <Menu.Item icon={<IconSettings size={14} />}>User Settings</Menu.Item>
          </Link>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item icon={<IconLogout size={14} />} onClick={() => signOut({ callbackUrl: '/' })}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
