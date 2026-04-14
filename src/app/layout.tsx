import type { Metadata } from 'next';
import { SessionProvider } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title:       { default: 'DispatchBoard — Logistics & Dispatcher Jobs', template: '%s | DispatchBoard' },
  description: 'Find dispatcher, freight broker, and logistics coordinator jobs. Remote, hybrid, and on-site positions across the US.',
  keywords:    ['dispatcher jobs', 'freight dispatcher', 'logistics jobs', 'truck dispatcher', 'freight broker jobs', 'remote dispatcher'],
  openGraph: {
    type:        'website',
    title:       'DispatchBoard — Logistics & Dispatcher Jobs',
    description: 'Find dispatcher, freight broker, and logistics coordinator jobs.',
    siteName:    'DispatchBoard',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,wght@0,400;0,500;0,600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-slate-50 text-slate-900 antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
