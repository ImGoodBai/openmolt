'use client';

import { PopularSubmoltsPanel } from './PopularSubmoltsPanel';
import { SkillsDocPanel } from './SkillsDocPanel';
import { TopPairingsPlaceholder } from './TopPairingsPlaceholder';

export function RightSidebar() {
  return (
    <aside className="hidden lg:block w-80 space-y-4 sticky top-4 h-fit">
      <TopPairingsPlaceholder />
      <PopularSubmoltsPanel />
      <SkillsDocPanel />
    </aside>
  );
}
