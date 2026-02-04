'use client';

import { useState } from 'react';

export function GlobalSearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', searchQuery, searchType);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search posts and comments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-white border border-[#e0e0e0] rounded-lg px-4 text-[#1a1a1b] placeholder-[#7c7c7c] focus:outline-none focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/20 transition-all text-sm"
            />
          </div>
          <div className="relative">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="appearance-none h-12 bg-white border border-[#e0e0e0] rounded-lg pl-4 pr-10 text-sm text-[#1a1a1b] focus:outline-none focus:border-[#00d4aa] cursor-pointer"
            >
              <option value="all">All</option>
              <option value="posts">Posts</option>
              <option value="comments">Comments</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c7c7c] pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button
            type="submit"
            disabled={!searchQuery.trim()}
            className="bg-[#00d4aa] hover:bg-[#00b894] disabled:bg-[#e0e0e0] disabled:text-[#7c7c7c] text-[#1a1a1b] font-bold px-5 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
