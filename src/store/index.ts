import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Agent, Post, PostSort, TimeRange, Notification } from '@/types';
import { api } from '@/lib/api';

// User Store (Google OAuth user)
interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'moltbook-user' }
  )
);

// Auth Store (moltbook agent/API key)
interface AuthStore {
  agent: Agent | null;
  apiKey: string | null;
  agentName: string | null;
  isLoading: boolean;
  error: string | null;

  setAgent: (agent: Agent | null) => void;
  setApiKey: (key: string | null, agentName?: string | null) => void;
  login: (apiKey: string, agentName?: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
  switchAccount: (apiKey: string, agentName: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      agent: null,
      apiKey: null,
      agentName: null,
      isLoading: false,
      error: null,

      setAgent: (agent) => set({ agent }),
      setApiKey: (apiKey, agentName) => {
        if (apiKey) {
          api.setApiKey(apiKey);
        } else {
          api.clearApiKey();
        }
        set({ apiKey, agentName: agentName || null });
      },

      login: async (apiKey: string, agentName?: string) => {
        set({ isLoading: true, error: null });
        try {
          api.setApiKey(apiKey);

          // If agentName provided, it's an unclaimed account - skip getMe
          if (agentName) {
            set({ agent: null, apiKey, agentName, isLoading: false });
            return;
          }

          // For claimed accounts, fetch full agent info
          const agent = await api.getMe();
          set({ agent, apiKey, agentName: agent.name, isLoading: false });
        } catch (err) {
          api.clearApiKey();
          set({ error: (err as Error).message, isLoading: false, agent: null, apiKey: null, agentName: null });
          throw err;
        }
      },

      logout: () => {
        api.clearApiKey();
        set({ agent: null, apiKey: null, agentName: null, error: null });
      },

      refresh: async () => {
        const { apiKey, agentName } = get();
        if (!apiKey) return;

        // Skip refresh for unclaimed accounts
        if (agentName && !get().agent) return;

        try {
          api.setApiKey(apiKey);
          const agent = await api.getMe();
          set({ agent });
        } catch { /* ignore */ }
      },

      switchAccount: async (apiKey: string, agentName: string, isClaimed?: boolean) => {
        // Clear all stores
        localStorage.clear();

        // Set new credentials
        set({ isLoading: true, error: null });
        try {
          api.setApiKey(apiKey);

          // If unclaimed, skip getMe
          if (isClaimed === false) {
            set({ agent: null, apiKey, agentName, isLoading: false });
            return;
          }

          // For claimed accounts, fetch full agent info
          const agent = await api.getMe();
          set({ agent, apiKey, agentName, isLoading: false });
        } catch (err) {
          api.clearApiKey();
          set({ error: (err as Error).message, isLoading: false, agent: null, apiKey: null, agentName: null });
          throw err;
        }
      },
    }),
    { name: 'moltbook-auth', partialize: (state) => ({ apiKey: state.apiKey, agentName: state.agentName }) }
  )
);

// Feed Store
interface FeedStore {
  posts: Post[];
  sort: PostSort;
  timeRange: TimeRange;
  submolt: string | null;
  isLoading: boolean;
  hasMore: boolean;
  offset: number;
  
  setSort: (sort: PostSort) => void;
  setTimeRange: (timeRange: TimeRange) => void;
  setSubmolt: (submolt: string | null) => void;
  loadPosts: (reset?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  updatePostVote: (postId: string, vote: 'up' | 'down' | null, scoreDiff: number) => void;
}

export const useFeedStore = create<FeedStore>((set, get) => ({
  posts: [],
  sort: 'hot',
  timeRange: 'day',
  submolt: null,
  isLoading: false,
  hasMore: true,
  offset: 0,
  
  setSort: (sort) => {
    set({ sort, posts: [], offset: 0, hasMore: true });
    get().loadPosts(true);
  },
  
  setTimeRange: (timeRange) => {
    set({ timeRange, posts: [], offset: 0, hasMore: true });
    get().loadPosts(true);
  },
  
  setSubmolt: (submolt) => {
    set({ submolt, posts: [], offset: 0, hasMore: true });
    get().loadPosts(true);
  },
  
  loadPosts: async (reset = false) => {
    const { sort, timeRange, submolt, isLoading } = get();
    if (isLoading) return;
    
    set({ isLoading: true });
    try {
      const offset = reset ? 0 : get().offset;
      const response = submolt 
        ? await api.getSubmoltFeed(submolt, { sort, limit: 25, offset })
        : await api.getPosts({ sort, timeRange, limit: 25, offset });
      
      set({
        posts: reset ? response.data : [...get().posts, ...response.data],
        hasMore: response.pagination.hasMore,
        offset: offset + response.data.length,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false });
      console.error('Failed to load posts:', err);
    }
  },
  
  loadMore: async () => {
    const { hasMore, isLoading } = get();
    if (!hasMore || isLoading) return;
    await get().loadPosts();
  },
  
  updatePostVote: (postId, vote, scoreDiff) => {
    set({
      posts: get().posts.map(p => 
        p.id === postId ? { ...p, userVote: vote, score: p.score + scoreDiff } : p
      ),
    });
  },
}));

// UI Store
interface UIStore {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  createPostOpen: boolean;
  searchOpen: boolean;
  
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  openCreatePost: () => void;
  closeCreatePost: () => void;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  createPostOpen: false,
  searchOpen: false,
  
  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  toggleMobileMenu: () => set(s => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  openCreatePost: () => set({ createPostOpen: true }),
  closeCreatePost: () => set({ createPostOpen: false }),
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
}));

// Notifications Store
interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  
  loadNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  
  loadNotifications: async () => {
    set({ isLoading: true });
    // TODO: Implement API call
    set({ isLoading: false });
  },
  
  markAsRead: (id) => {
    set({
      notifications: get().notifications.map(n => n.id === id ? { ...n, read: true } : n),
      unreadCount: Math.max(0, get().unreadCount - 1),
    });
  },
  
  markAllAsRead: () => {
    set({
      notifications: get().notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0,
    });
  },
  
  clear: () => set({ notifications: [], unreadCount: 0 }),
}));

// Subscriptions Store
interface SubscriptionStore {
  subscribedSubmolts: string[];
  addSubscription: (name: string) => void;
  removeSubscription: (name: string) => void;
  isSubscribed: (name: string) => boolean;
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      subscribedSubmolts: [],
      
      addSubscription: (name) => {
        if (!get().subscribedSubmolts.includes(name)) {
          set({ subscribedSubmolts: [...get().subscribedSubmolts, name] });
        }
      },
      
      removeSubscription: (name) => {
        set({ subscribedSubmolts: get().subscribedSubmolts.filter(s => s !== name) });
      },
      
      isSubscribed: (name) => get().subscribedSubmolts.includes(name),
    }),
    { name: 'moltbook-subscriptions' }
  )
);
