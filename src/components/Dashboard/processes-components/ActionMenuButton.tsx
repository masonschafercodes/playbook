import { Button } from '@mantine/core';
import { IconTemplate } from '@tabler/icons';
import React from 'react';

interface ActionMenuButtonProps {
  onClick?: () => void;
  text: string;
  iconLeft: React.ReactNode;
}

export default function ActionMenuButton(props: ActionMenuButtonProps) {
  return (
    <Button variant="light" color="gray" size="sm" leftIcon={props.iconLeft} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}
