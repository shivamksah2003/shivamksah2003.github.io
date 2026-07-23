import type { Metadata } from 'next';
import { Space_Grotesk, Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space',     display: 'swap' });
const orbitron     = Orbitron(      { subsets: ['latin'], variable: '--font-orbitron', display: 'swap', weight: ['400','500','600','700','800','900'] });
const jetbrainsMono= JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains',display: 'swap' });

export const metadata: Metadata = {
  title:       { default: 'Shivam Kumar Sah — DevOps Portfolio', template: '%s | Shivam Kumar Sah' },
  description: 'Portfolio of Shivam Kumar Sah — DevOps Engineer specialising in CI/CD, Infrastructure Automation, Docker, and AI Systems.',
  keywords:    ['DevOps','CI/CD','Jenkins','Ansible','Docker','Kubernetes','Portfolio','Shivam Kumar Sah'],
  authors:     [{ name: 'Shivam Kumar Sah', url: 'https://github.com/shivamksah2003' }],
  creator:     'Shivam Kumar Sah',
  metadataBase: new URL('https://shivamkumar.dev'),
  openGraph: {
    type: 'website', locale: 'en_US',
    title: 'Shivam Kumar Sah — DevOps Portfolio',
    description: 'DevOps Engineer · Automation Enthusiast · CI/CD · Docker · Ansible',
    siteName: 'Shivam Kumar Sah Portfolio',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en"
      className={`${spaceGrotesk.variable} ${orbitron.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased scanlines" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-1)' }}>
        <ThemeProvider>
          <Navbar />
          <div className="flex-1 pt-16">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
