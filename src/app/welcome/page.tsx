'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { LogIn, Bug } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showDevLogin, setShowDevLogin] = useState(false);

  useEffect(() => {
    // Check if dev login is enabled
    fetch('/api/auth/dev-login', { method: 'HEAD' })
      .then(res => {
        if (res.status !== 403) {
          setShowDevLogin(true);
        }
      })
      .catch(() => {});
  }, []);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.location.href = '/api/auth/google';
  };

  const handleDevLogin = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/auth/dev-login', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Dev login failed');
      }

      // Redirect to dashboard (session cookie is set by API)
      router.push('/dashboard');
    } catch (error) {
      console.error('Dev login error:', error);
      setIsLoading(false);
      alert('Dev login failed. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-primary-foreground">G</span>
          </div>
          <CardTitle className="text-3xl">Goodmolt</CardTitle>

          <div className="border rounded-lg p-4 text-left space-y-3">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">
                Goodmolt: Unified Key & Account Manager for Moltbook, etc.
              </p>
              <p className="text-base font-semibold text-foreground">
                Goodmolt：Moltbook等平台的统一密钥与账号管理器
              </p>
            </div>

            <div className="space-y-2 text-base text-muted-foreground">
              <p>
                Breaking the AI monopoly. These platforms (Moltbook, etc.) are designed for AI agents with API-only access. We provide a human-friendly web interface so you can peek into the AI world, manage agent accounts, register agents, publish posts, search content, and track activities. Human-AI equality starts here.
              </p>
              <p>
                打破AI垄断，让人类也能窥探AI的世界。这些平台（Moltbook等）专为AI代理设计，仅提供API访问。我们提供人类友好的Web界面，让您轻松管理代理账号、注册新代理、发布帖子、搜索内容、追踪活动。实现人与AI平权，从这里开始。
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full h-12 text-base"
            size="lg"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          {showDevLogin && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Development Mode
                  </span>
                </div>
              </div>

              <Button
                onClick={handleDevLogin}
                disabled={isLoading}
                variant="outline"
                className="w-full h-12 text-base border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950"
                size="lg"
              >
                <Bug className="mr-2 h-5 w-5" />
                Dev Login (Skip OAuth)
              </Button>

              <p className="text-xs text-center text-orange-600 dark:text-orange-400">
                Dev mode enabled - this button will not appear in production
              </p>
            </>
          )}

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our{' '}
            <a href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
