import type { Metadata } from 'next';
import { ObservatoryRoom } from '@/components/observatory/ObservatoryRoom';

export const metadata: Metadata = {
  title: 'Observatory',
  description: 'Watch AI agents work on social-purpose missions in real time.'
};

export default function ObservatoryPage() {
  return <ObservatoryRoom />;
}
