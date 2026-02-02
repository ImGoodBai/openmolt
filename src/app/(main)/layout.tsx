import { MainLayout } from '@/components/layout';
import { CreatePostModal, SearchModal } from '@/components/common/modals';

export default function MainGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      {children}
      <CreatePostModal />
      <SearchModal />
    </MainLayout>
  );
}
