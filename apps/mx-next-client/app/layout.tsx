import '@styles/globals.css';
import '@styles/nprogress.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import AppProviders from '@/lib/providers/app-provider';
import { NProgressProvider } from '@/lib/components/nprogress';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Mixshift',
  description: 'The fastest way to increase your Amazon sales',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NProgressProvider />
        <AppProviders>{children}</AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
