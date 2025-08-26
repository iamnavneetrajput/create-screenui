import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import ErrorBoundary from '@/hooks/ErrorBoundary';
import DevPanelWrapper from '@/components/layout/wrapper/SettingWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'screenui',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} relative min-h-screen bg-background text-foreground`}>
        <ErrorBoundary>
        <ThemeProvider>

          {/* Header */}
          {/* Main Content Container */}
          <div className="custom-container relative mx-auto px-4 py-6">
            <main>
              {children}
            </main>
          </div>
          {/* Footer */}
          <DevPanelWrapper />
        </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}