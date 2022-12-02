import React from 'react';
import { PrismShell } from '../UI/shell-components/PrismShell';
import TemplateCards from './template-components/template-cards';

export default function Templates({ user, teamId }: any) {
  return (
    <PrismShell user={user}>
      <TemplateCards teamId={teamId} />
    </PrismShell>
  );
}
