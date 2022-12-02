import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import React from 'react';

interface ProcessSearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
}

export default function ProcessSearch(props: ProcessSearchProps) {
  return (
    <TextInput
      value={props.search}
      onChange={(e) => props.setSearch(e.target.value)}
      disabled={props.disabled}
      w="100%"
      placeholder="Search Processes"
      icon={<IconSearch size={14} />}
    />
  );
}
