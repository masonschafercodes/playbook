import { Grid, Badge, Loader } from '@mantine/core';
import React from 'react';
import fetcher from '~/utils/SWRFetcher';
import useSWR from 'swr';
import { Tag } from '@prisma/client';
import { TagsResponse } from '~/pages/api/v1/users/tags';

interface TagsGridProps {
  teamId: string;
}

export default function TagsGrid(props: TagsGridProps) {
  const { data, error } = useSWR<TagsResponse>(`/api/v1/users/tags?teamId=${props.teamId}`, fetcher);

  if (error)
    return (
      <Badge color="red" size="md" radius="sm" mt="md">
        Failed to load tags
      </Badge>
    );
  if (!data) return <Loader mt="md" color="gray" size="sm" variant="bars" />;

  if (data && data.tags.length === 0)
    return (
      <Badge color="gray" size="md" radius="sm" mt="md">
        No tags
      </Badge>
    );

  return (
    <Grid mt="sm" sx={{ maxWidth: '50%' }} grow>
      {data.tags.map((tag) => (
        <Grid.Col span={6} key={tag.id} w="100%">
          <Badge color="grape.1" size="lg" radius="sm" variant="light">
            {tag.name}
          </Badge>
        </Grid.Col>
      ))}
    </Grid>
  );
}
