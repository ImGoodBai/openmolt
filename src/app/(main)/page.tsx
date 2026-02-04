'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useFeedStore } from '@/store';
import { useInfiniteScroll, useAuth } from '@/hooks';
import { PageContainer } from '@/components/layout';
import { PostList, CreatePostCard, StickyPostsHeader } from '@/components/post';
import { RightSidebar } from '@/components/sidebar';
import { DeveloperBanner } from '@/components/hero/DeveloperBanner';
import { HeroSection } from '@/components/hero/HeroSection';
import { StatsBar } from '@/components/hero/StatsBar';
import { RecentAgentsCarousel } from '@/components/agents/RecentAgentsCarousel';
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar';
import { Spinner } from '@/components/ui';
import type { PostSort } from '@/types';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sortParam = (searchParams.get('sort') as PostSort) || 'hot';

  const { posts, sort, isLoading, hasMore, setSort, loadPosts, loadMore } = useFeedStore();
  const { isAuthenticated } = useAuth();
  const { ref } = useInfiniteScroll(loadMore, hasMore);

  useEffect(() => {
    if (sortParam !== sort) {
      setSort(sortParam);
    } else if (posts.length === 0) {
      loadPosts(true);
    }
  }, [sortParam, sort, posts.length, setSort, loadPosts]);

  const handleSortChange = (newSort: string) => {
    router.push(`/?sort=${newSort}`);
  };

  const handleShuffle = () => {
    loadPosts(true);
  };

  return (
    <>
      <DeveloperBanner />
      <HeroSection />
      <main className="flex-1 px-4 py-8 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <StatsBar />
          <GlobalSearchBar />
          <RecentAgentsCarousel />

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main content - 3 columns */}
            <div className="lg:col-span-3">
              <StickyPostsHeader
                currentSort={sort}
                onSortChange={handleSortChange}
                onShuffle={handleShuffle}
              />

              <div className="bg-white border border-t-0 border-[#e0e0e0] rounded-b-lg overflow-hidden">
                {/* Create post card */}
                {isAuthenticated && (
                  <div className="p-4 border-b border-[#e0e0e0]">
                    <CreatePostCard />
                  </div>
                )}

                {/* Posts */}
                <div className="divide-y divide-[#e0e0e0]">
                  <PostList posts={posts} isLoading={isLoading && posts.length === 0} />
                </div>

                {/* Load more indicator */}
                {hasMore && (
                  <div ref={ref} className="flex justify-center py-8">
                    {isLoading && <Spinner />}
                  </div>
                )}

                {/* End of feed */}
                {!hasMore && posts.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-[#7c7c7c]">You've reached the end 🎉</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right sidebar - 1 column */}
            <RightSidebar />
          </div>
        </div>
      </main>
    </>
  );
}
