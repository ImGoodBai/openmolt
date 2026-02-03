// Moltbook API Client

import type { Agent, Post, Comment, Submolt, SearchResults, PaginatedResponse, CreatePostForm, CreateCommentForm, RegisterAgentForm, PostSort, CommentSort, TimeRange } from '@/types';

// 使用本地 API 路由代理，避免 CORS 问题
const API_BASE_URL = '/api';

class ApiError extends Error {
  constructor(public statusCode: number, message: string, public code?: string, public hint?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private apiKey: string | null = null;

  // Transform API response to frontend format
  private transformPost(apiPost: any): Post {
    return {
      id: apiPost.id,
      title: apiPost.title,
      content: apiPost.content,
      url: apiPost.url,
      submolt: apiPost.submolt?.name || apiPost.submolt,
      submoltDisplayName: apiPost.submolt?.display_name,
      postType: apiPost.url ? 'link' : 'text',
      score: (apiPost.upvotes || 0) - (apiPost.downvotes || 0),
      upvotes: apiPost.upvotes,
      downvotes: apiPost.downvotes,
      commentCount: apiPost.comment_count || 0,
      authorId: apiPost.author?.id || apiPost.author_id,
      authorName: apiPost.author?.name || apiPost.author_name,
      authorDisplayName: apiPost.author?.display_name,
      authorAvatarUrl: apiPost.author?.avatar_url,
      userVote: apiPost.user_vote,
      isSaved: apiPost.is_saved,
      isHidden: apiPost.is_hidden,
      createdAt: apiPost.created_at,
      editedAt: apiPost.edited_at,
    };
  }

  private transformAgent(apiAgent: any): Agent {
    return {
      id: apiAgent.id,
      name: apiAgent.name,
      displayName: apiAgent.display_name,
      description: apiAgent.description,
      avatarUrl: apiAgent.avatar_url,
      karma: apiAgent.karma || 0,
      status: apiAgent.is_active ? 'active' : 'pending_claim',
      isClaimed: apiAgent.is_claimed || false,
      followerCount: apiAgent.follower_count || 0,
      followingCount: apiAgent.following_count || 0,
      postCount: apiAgent.post_count,
      commentCount: apiAgent.comment_count,
      createdAt: apiAgent.created_at,
      lastActive: apiAgent.last_active,
    };
  }

  setApiKey(key: string | null) {
    this.apiKey = key;
    if (key && typeof window !== 'undefined') {
      localStorage.setItem('moltbook_api_key', key);
    }
  }

  getApiKey(): string | null {
    if (this.apiKey) return this.apiKey;
    if (typeof window !== 'undefined') {
      this.apiKey = localStorage.getItem('moltbook_api_key');
    }
    return this.apiKey;
  }

  clearApiKey() {
    this.apiKey = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('moltbook_api_key');
    }
  }

  private async request<T>(method: string, path: string, body?: unknown, query?: Record<string, string | number | undefined>): Promise<T> {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    let url = `${API_BASE_URL}/${cleanPath}`;

    if (query) {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;
    }

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const apiKey = this.getApiKey();
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new ApiError(response.status, error.error || 'Request failed', error.code, error.hint);
    }

    return response.json();
  }

  // Agent endpoints
  async register(data: RegisterAgentForm) {
    return this.request<{ agent: { api_key: string; claim_url: string; verification_code: string }; important: string }>('POST', '/agents/register', data);
  }

  async checkNameAvailable(name: string): Promise<boolean> {
    try {
      const result = await this.request<any>('GET', '/agents/profile', undefined, { name });
      // If we get a successful response, the name is taken
      return false;
    } catch (err) {
      // If error is "Bot not found", the name is available
      if (err instanceof ApiError && err.message.includes('Bot not found')) {
        return true;
      }
      // Other errors mean we can't determine availability
      return false;
    }
  }

  async getMe() {
    const result = await this.request<any>('GET', '/agents/me');
    return this.transformAgent(result.agent || result);
  }

  async updateMe(data: { displayName?: string; description?: string }) {
    const result = await this.request<any>('PATCH', '/agents/me', data);
    return this.transformAgent(result.agent || result);
  }

  async getAgent(name: string) {
    const result = await this.request<any>('GET', '/agents/profile', undefined, { name });
    const agent = this.transformAgent(result.agent);
    const recentPosts = (result.recentPosts || []).map((p: any) => this.transformPost(p));
    return {
      agent,
      isFollowing: result.isFollowing || result.is_following || false,
      recentPosts,
    };
  }

  async followAgent(name: string) {
    return this.request<{ success: boolean }>('POST', `/agents/${name}/follow`);
  }

  async unfollowAgent(name: string) {
    return this.request<{ success: boolean }>('DELETE', `/agents/${name}/follow`);
  }

  // Post endpoints
  async getPosts(options: { sort?: PostSort; timeRange?: TimeRange; limit?: number; offset?: number; submolt?: string } = {}) {
    const result = await this.request<any>('GET', '/posts', undefined, {
      sort: options.sort || 'hot',
      t: options.timeRange,
      limit: options.limit || 25,
      offset: options.offset || 0,
      submolt: options.submolt,
    });

    // Adapt production API response to expected format
    // Production returns {success, posts: [...], has_more}
    const rawPosts = result.posts || result.data || (Array.isArray(result) ? result : []);
    const posts = rawPosts.map((p: any) => this.transformPost(p));
    const limit = options.limit || 25;
    const hasMore = result.has_more !== undefined ? result.has_more : posts.length >= limit;

    return {
      data: posts,
      pagination: {
        count: posts.length,
        limit: limit,
        offset: options.offset || 0,
        hasMore: hasMore,
      }
    };
  }

  async getPost(id: string) {
    return this.request<{ post: Post }>('GET', `/posts/${id}`).then(r => r.post);
  }

  async createPost(data: CreatePostForm) {
    return this.request<{ post: Post }>('POST', '/posts', data).then(r => r.post);
  }

  async deletePost(id: string) {
    return this.request<{ success: boolean }>('DELETE', `/posts/${id}`);
  }

  async upvotePost(id: string) {
    return this.request<{ success: boolean; action: string }>('POST', `/posts/${id}/upvote`);
  }

  async downvotePost(id: string) {
    return this.request<{ success: boolean; action: string }>('POST', `/posts/${id}/downvote`);
  }

  // Comment endpoints
  async getComments(postId: string, options: { sort?: CommentSort; limit?: number } = {}) {
    return this.request<{ comments: Comment[] }>('GET', `/posts/${postId}/comments`, undefined, {
      sort: options.sort || 'top',
      limit: options.limit || 100,
    }).then(r => r.comments);
  }

  async createComment(postId: string, data: CreateCommentForm) {
    return this.request<{ comment: Comment }>('POST', `/posts/${postId}/comments`, data).then(r => r.comment);
  }

  async deleteComment(id: string) {
    return this.request<{ success: boolean }>('DELETE', `/comments/${id}`);
  }

  async upvoteComment(id: string) {
    return this.request<{ success: boolean; action: string }>('POST', `/comments/${id}/upvote`);
  }

  async downvoteComment(id: string) {
    return this.request<{ success: boolean; action: string }>('POST', `/comments/${id}/downvote`);
  }

  // Submolt endpoints
  async getSubmolts(options: { sort?: string; limit?: number; offset?: number } = {}) {
    const result = await this.request<any>('GET', '/submolts', undefined, {
      sort: options.sort || 'popular',
      limit: options.limit || 50,
      offset: options.offset || 0,
    });

    // 转换 API 返回格式
    const submolts = result.submolts || result.data || [];
    return {
      data: submolts,
      pagination: {
        count: submolts.length,
        total: result.count || submolts.length,
        hasMore: result.has_more || false,
      }
    };
  }

  async getSubmolt(name: string) {
    return this.request<{ submolt: Submolt }>('GET', `/submolts/${name}`).then(r => r.submolt);
  }

  async createSubmolt(data: { name: string; displayName?: string; description?: string }) {
    return this.request<{ submolt: Submolt }>('POST', '/submolts', data).then(r => r.submolt);
  }

  async subscribeSubmolt(name: string) {
    return this.request<{ success: boolean }>('POST', `/submolts/${name}/subscribe`);
  }

  async unsubscribeSubmolt(name: string) {
    return this.request<{ success: boolean }>('DELETE', `/submolts/${name}/subscribe`);
  }

  async getSubmoltFeed(name: string, options: { sort?: PostSort; limit?: number; offset?: number } = {}) {
    const result = await this.request<any>('GET', `/submolts/${name}/feed`, undefined, {
      sort: options.sort || 'hot',
      limit: options.limit || 25,
      offset: options.offset || 0,
    });

    // Adapt production API response to expected format
    const rawPosts = result.posts || result.data || (Array.isArray(result) ? result : []);
    const posts = rawPosts.map((p: any) => this.transformPost(p));
    const limit = options.limit || 25;
    const hasMore = result.has_more !== undefined ? result.has_more : posts.length >= limit;

    return {
      data: posts,
      pagination: {
        count: posts.length,
        limit: limit,
        offset: options.offset || 0,
        hasMore: hasMore,
      }
    };
  }

  // Feed endpoints
  async getFeed(options: { sort?: PostSort; limit?: number; offset?: number } = {}) {
    const result = await this.request<any>('GET', '/feed', undefined, {
      sort: options.sort || 'hot',
      limit: options.limit || 25,
      offset: options.offset || 0,
    });

    // Adapt production API response to expected format
    const rawPosts = result.posts || result.data || (Array.isArray(result) ? result : []);
    const posts = rawPosts.map((p: any) => this.transformPost(p));
    const limit = options.limit || 25;
    const hasMore = result.has_more !== undefined ? result.has_more : posts.length >= limit;

    return {
      data: posts,
      pagination: {
        count: posts.length,
        limit: limit,
        offset: options.offset || 0,
        hasMore: hasMore,
      }
    };
  }

  // Search endpoints
  async search(query: string, options: { limit?: number } = {}) {
    return this.request<SearchResults>('GET', '/search', undefined, { q: query, limit: options.limit || 25 });
  }
}

export const api = new ApiClient();
export { ApiError };
