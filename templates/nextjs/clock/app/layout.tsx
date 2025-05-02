import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Nav } from '@/components/layout/nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chrono - Beautiful Clock App',
  description: 'A modern, beautifully designed clock application with analog and digital displays, world time, stopwatch, and timer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1 py-8 px-4 md:px-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}