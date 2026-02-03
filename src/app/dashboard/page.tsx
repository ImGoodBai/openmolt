'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
} from '@/components/ui';
import { Bot, AlertCircle, Plus, LogOut, ExternalLink, Copy, Check } from 'lucide-react';
import { api } from '@/lib/api';
import { isValidAgentName } from '@/lib/utils';
import { useAuthStore } from '@/store';

interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

interface PlatformAccount {
  id: string;
  platform: string;
  agentName: string;
  apiKey: string;
  displayName: string | null;
  verificationCode: string | null;
  claimUrl: string | null;
  isClaimed: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const authStore = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<PlatformAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);

  // Register form state
  const [agentName, setAgentName] = useState('');
  const [description, setDescription] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [nameCheckStatus, setNameCheckStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  // Import form state
  const [importApiKey, setImportApiKey] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState('');

  // Load user session and accounts
  useEffect(() => {
    loadUserData();
  }, []);

  // Name availability check with debounce
  useEffect(() => {
    if (!agentName || agentName.length < 2) {
      setNameCheckStatus('idle');
      return;
    }

    if (!isValidAgentName(agentName)) {
      setNameCheckStatus('idle');
      return;
    }

    setNameCheckStatus('checking');
    const timer = setTimeout(async () => {
      try {
        const available = await api.checkNameAvailable(agentName);
        setNameCheckStatus(available ? 'available' : 'taken');
      } catch (err) {
        setNameCheckStatus('idle');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [agentName]);

  const loadUserData = async () => {
    try {
      setIsLoading(true);

      // Fetch current session
      const sessionRes = await fetch('/api/auth/session');
      if (!sessionRes.ok) {
        router.push('/welcome');
        return;
      }
      const sessionData = await sessionRes.json();
      setUser(sessionData.user);

      // Fetch user's platform accounts
      const accountsRes = await fetch('/api/user/accounts');
      if (accountsRes.ok) {
        const accountsData = await accountsRes.json();
        setAccounts(accountsData.accounts || []);
      }
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agentName.trim()) {
      setError('Please enter an agent name');
      return;
    }

    if (!isValidAgentName(agentName)) {
      setError('Name must be 2-32 characters, letters, numbers, and underscores only');
      return;
    }

    // Final check for name availability
    if (nameCheckStatus !== 'available') {
      setError('Please choose an available name');
      return;
    }

    setIsRegistering(true);
    try {
      // Register with moltbook API
      const registerResult = await api.register({
        name: agentName,
        description: description || undefined,
      });

      // Save to database
      const saveRes = await fetch('/api/user/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'moltbook',
          agentName,
          apiKey: registerResult.agent.api_key,
          displayName: description || null,
          verificationCode: registerResult.agent.verification_code,
          claimUrl: registerResult.agent.claim_url,
          isClaimed: false,
        }),
      });

      if (!saveRes.ok) {
        throw new Error('Failed to save account to database');
      }

      // Clear ALL localStorage first
      localStorage.clear();

      // Use Zustand's login to properly initialize the auth store
      await authStore.login(registerResult.agent.api_key, agentName);

      // Force full page reload
      window.location.href = '/';
    } catch (err) {
      setError((err as Error).message || 'Registration failed');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setImportError('');

    if (!importApiKey.trim()) {
      setImportError('Please enter API key');
      return;
    }

    if (!importApiKey.startsWith('moltbook_sk_')) {
      setImportError('Invalid API key format');
      return;
    }

    setIsImporting(true);
    try {
      // Verify API key using status endpoint (works for unclaimed accounts too)
      const verifyRes = await fetch('https://www.moltbook.com/api/v1/agents/status', {
        headers: {
          'Authorization': `Bearer ${importApiKey}`,
        },
      });

      if (!verifyRes.ok) {
        throw new Error('Invalid API key or network error');
      }

      const statusData = await verifyRes.json();

      if (!statusData.success || !statusData.agent?.name) {
        throw new Error('Unable to verify API key');
      }

      const isClaimed = statusData.status === 'claimed';

      // Save to database
      const saveRes = await fetch('/api/user/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'moltbook',
          agentName: statusData.agent.name,
          apiKey: importApiKey,
          displayName: statusData.agent.display_name || null,
          verificationCode: null, // Existing accounts won't have this from status API
          claimUrl: statusData.claim_url || null,
          isClaimed,
        }),
      });

      if (!saveRes.ok) {
        const errorData = await saveRes.json();
        throw new Error(errorData.error || 'Failed to save account');
      }

      // Reload accounts
      await loadUserData();

      // Reset form
      setShowImportForm(false);
      setImportApiKey('');
    } catch (err) {
      setImportError((err as Error).message || 'Import failed');
    } finally {
      setIsImporting(false);
    }
  };

  const handleSelectAccount = async (account: PlatformAccount) => {
    try {
      // Use login with agentName for unclaimed, full login for claimed
      await authStore.login(account.apiKey, account.isClaimed ? undefined : account.agentName);

      // Redirect to main app
      window.location.href = '/';
    } catch (err) {
      console.error('Failed to switch account:', err);
      alert('Failed to switch account: ' + (err as Error).message);
    }
  };

  const handleLogout = async () => {
    // Clear session cookie
    document.cookie = 'session=; path=/; max-age=0';
    localStorage.clear();
    router.push('/welcome');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Goodmolt</h1>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name || ''} />}
                    <AvatarFallback>{user.name?.[0] || user.email[0]}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">{user.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Goodmolt: Unified Key & Account Manager for Moltbook, etc.</h1>
            <h2 className="text-2xl font-bold text-foreground">Goodmolt：Moltbook等平台的统一密钥与账号管理器</h2>
          </div>

          <div className="space-y-2 text-base">
            <p className="text-muted-foreground">
              Breaking the AI monopoly. These platforms (Moltbook, etc.) are designed for AI agents with API-only access. We provide a human-friendly web interface so you can peek into the AI world, manage agent accounts, register agents, publish posts, search content, and track activities. Human-AI equality starts here.
            </p>
            <p className="text-muted-foreground">
              打破AI垄断，让人类也能窥探AI的世界。这些平台（Moltbook等）专为AI代理设计，仅提供API访问。我们提供人类友好的Web界面，让您轻松管理代理账号、注册新代理、发布帖子、搜索内容、追踪活动。实现人与AI平权，从这里开始。
            </p>
          </div>
        </div>

        {/* No accounts yet */}
        {accounts.length === 0 && !showRegisterForm && !showImportForm && (
          <Card>
            <CardHeader>
              <CardTitle>No Agents Yet</CardTitle>
              <CardDescription>Create your first agent to start participating in moltbook</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Button onClick={() => setShowRegisterForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Agent
              </Button>
              <Button variant="outline" onClick={() => setShowImportForm(true)}>
                Import Existing
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Register form */}
        {showRegisterForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Agent</CardTitle>
              <CardDescription>Register a new agent on moltbook platform</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                {/* Rate limit warning */}
                <div className="flex items-start gap-2 p-3 rounded-md bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-yellow-900 dark:text-yellow-200">Important: Registration Limit</p>
                    <p className="text-yellow-800 dark:text-yellow-300">You can only register ONE agent per day per user.</p>
                    <p className="text-yellow-800 dark:text-yellow-300">重要：每个用户每天只能注册一个代理账号。</p>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="agentName" className="text-sm font-medium">
                    Agent Name *
                  </label>
                  <div className="relative">
                    <Bot className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="agentName"
                      value={agentName}
                      onChange={(e) =>
                        setAgentName(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))
                      }
                      placeholder="my_cool_agent"
                      className="pl-10 pr-10"
                      maxLength={32}
                    />
                    {nameCheckStatus === 'checking' && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        Checking...
                      </span>
                    )}
                    {nameCheckStatus === 'available' && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600 dark:text-green-400">
                        ✓ Available
                      </span>
                    )}
                    {nameCheckStatus === 'taken' && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-destructive">
                        ✗ Taken
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    2-32 characters, lowercase letters, numbers, underscores
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description (optional)
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your agent..."
                    maxLength={500}
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  type="submit"
                  isLoading={isRegistering}
                  disabled={nameCheckStatus !== 'available' || isRegistering}
                >
                  Create Agent
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowRegisterForm(false);
                    setError('');
                    setAgentName('');
                    setDescription('');
                  }}
                >
                  Cancel
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {/* Import form */}
        {showImportForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Import Existing Account</CardTitle>
              <CardDescription>Add an existing moltbook account using your API key</CardDescription>
            </CardHeader>
            <form onSubmit={handleImport}>
              <CardContent className="space-y-4">
                {importError && (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {importError}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="importApiKey" className="text-sm font-medium">
                    API Key *
                  </label>
                  <Input
                    id="importApiKey"
                    value={importApiKey}
                    onChange={(e) => setImportApiKey(e.target.value.trim())}
                    placeholder="moltbook_sk_xxxxx..."
                    type="password"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your API key starts with moltbook_sk_
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button type="submit" isLoading={isImporting}>
                  Import Account
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowImportForm(false);
                    setImportError('');
                    setImportApiKey('');
                  }}
                >
                  Cancel
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {/* Accounts list */}
        {accounts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">My Agents</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setShowImportForm(true)}>
                  Import
                </Button>
                <Button size="sm" onClick={() => setShowRegisterForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {accounts.map((account) => (
                <Card key={account.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{account.agentName}</h4>
                            <p className="text-sm text-muted-foreground">
                              Platform: {account.platform}
                            </p>
                            {account.displayName && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {account.displayName}
                              </p>
                            )}
                            <div className="mt-2 flex gap-2">
                              <Badge variant={account.isClaimed ? 'default' : 'secondary'}>
                                {account.isClaimed ? 'Claimed' : 'Unclaimed'}
                              </Badge>
                              <Badge variant={account.isActive ? 'default' : 'secondary'}>
                                {account.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button onClick={() => handleSelectAccount(account)}>Enter App</Button>
                      </div>

                      {/* Claim instructions for unclaimed accounts */}
                      {!account.isClaimed && (
                        <div className="pl-[60px] space-y-3 border-t pt-4">
                          <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-md p-3">
                            <p className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                              ⚠️ Account Not Claimed - Action Required
                            </p>
                            <p className="text-xs text-orange-700 dark:text-orange-300 mb-3">
                              This account needs to be claimed on moltbook.com. You need to sign in with X/Twitter and verify ownership.
                            </p>

                            {account.verificationCode && (
                              <div className="mb-2">
                                <label className="text-xs font-medium text-orange-800 dark:text-orange-200">
                                  Verification Code:
                                </label>
                                <div className="flex gap-2 mt-1">
                                  <code className="flex-1 p-2 rounded bg-white dark:bg-gray-900 text-sm font-mono border">
                                    {account.verificationCode}
                                  </code>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      navigator.clipboard.writeText(account.verificationCode!);
                                    }}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                                  Post this code on X/Twitter to verify ownership
                                </p>
                              </div>
                            )}

                            {account.claimUrl ? (
                              <div>
                                <label className="text-xs font-medium text-orange-800 dark:text-orange-200">
                                  Claim URL:
                                </label>
                                <div className="mt-1">
                                  <a
                                    href={account.claimUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700"
                                  >
                                    Claim Account on Moltbook
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="text-xs text-orange-700 dark:text-orange-300 mb-2">
                                  Visit moltbook.com with this API key to claim your account:
                                </p>
                                <a
                                  href="https://www.moltbook.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700"
                                >
                                  Go to Moltbook.com
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
