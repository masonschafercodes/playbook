import React from 'react';
import { IconDashboard, IconApi, IconSettings, IconTemplate } from '@tabler/icons';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { useRouter } from 'next/router';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
}

function MainLink({ icon, color, label, href }: MainLinkProps) {
  const router = useRouter();
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        marginTop: theme.spacing.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        backgroundColor:
          router.pathname === href ? (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]) : 'transparent',

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      onClick={() => router.push(href)}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <IconDashboard size={16} />,
    color: 'grape.1',
    label: 'Processes',
    href: '/dashboard',
  },
  {
    icon: <IconTemplate size={16} />,
    color: 'grape.1',
    label: 'Templates',
    href: '/dashboard/templates',
  },
  {
    icon: <IconSettings size={16} />,
    color: 'grape.1',
    label: 'Team Settings',
    href: '/dashboard/settings',
  },
  {
    icon: <IconApi size={16} />,
    color: 'grape.1',
    label: 'API Settings',
    href: '/dashboard/api',
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
