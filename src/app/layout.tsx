import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: { default: 'THE PAULI EFFECT — Observable Agents for Social Purpose', template: '%s | THE PAULI EFFECT' },
  description: 'THE PAULI EFFECT lets people watch AI agents work on real missions — grants, research, campaigns, social posts, podcasts, and public impact records. Built in Seattle for nonprofits and social-purpose organizations.',
  keywords: ['AI agents', 'observable agents', 'social purpose', 'nonprofit AI', 'Seattle AI', 'transparent AI', 'mission', 'impact'],
  authors: [{ name: 'THE PAULI EFFECT' }],
  creator: 'THE PAULI EFFECT',
  metadataBase: new URL('https://www.paulieffect.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.paulieffect.ai',
    siteName: 'THE PAULI EFFECT',
    title: 'THE PAULI EFFECT — Observable Agents for Social Purpose',
    description: 'Watch AI agents work on real social-purpose missions. Built in Seattle.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'THE PAULI EFFECT' }],
  },
  twitter: { card: 'summary_large_image', title: 'THE PAULI EFFECT', description: 'Observable Agents for Social Purpose' },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
