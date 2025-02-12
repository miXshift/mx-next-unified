import { SidebarProvider } from '@ui/sidebar';
import { ThemeProvider } from '@providers/theme-provider';
import '@styles/globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

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
        <SidebarProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </SidebarProvider>
        <Analytics />
      </body>
    </html>
  );
}
