import { AppShell, Text, Group, Header, Navbar, Flex, ActionIcon, ScrollArea } from '@mantine/core';
import { IconVocabulary } from '@tabler/icons';
import React from 'react';
import { MainLinks } from './MainLinks';
import { UserInfo } from '../../Dashboard/UserInfo';

interface DashboardProps {
  user: any;
  children: React.ReactNode;
}

export function PrismShell(props: DashboardProps) {
  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={
        <Navbar width={{ base: 300 }} height="93vh" p="xs">
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <UserInfo {...props.user} />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group sx={{ height: '100%' }} px={20} position="apart">
            <Flex direction="row" align="center" gap="md">
              <ActionIcon component="a" href="/" variant="light" color="grape.2" size="lg">
                <IconVocabulary size={24} />
              </ActionIcon>
              <Text size="xl" weight={500}>
                Playbook
              </Text>
            </Flex>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <ScrollArea.Autosize maxHeight="89vh" sx={{ maxWidth: '100%' }} mx="auto" type="never">
        {props.children}
      </ScrollArea.Autosize>
    </AppShell>
  );
}
