import '@app/globals.scss';
import '../styles/base/tailwind.css';
import { IBM_Plex_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { getBaseUrl } from '@/lib/siteUrl';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--title-font',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--text-font',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Jonathan TURPIN | Portfolio',
    template: 'Jonathan TURPIN | %s',
  },
  description: 'Portfolio — projets, parcours et contact.',
  applicationName: 'Jonathan TURPIN | Portfolio',
  category: 'Portfolio',
  keywords: [
    'développeur web',
    'développeur fullstack',
    'portfolio',
    'Next.js',
    'React',
    'TypeScript',
    'SEO',
    'accessibilité',
    'performance',
  ],
  authors: [{ name: 'Jonathan Turpin' }],
  creator: 'Jonathan Turpin',
  publisher: 'Jonathan Turpin',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: 'Jonathan TURPIN | Portfolio',
    description: 'Portfolio — projets, parcours et contact.',
    url: '/',
    siteName: 'Jonathan TURPIN',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/pictures/socials/banner.png',
        alt: 'Jonathan Turpin — Développeur web fullstack',
      },
      {
        url: '/pictures/socials/business_card.png',
        alt: 'Jonathan Turpin — Développeur web fullstack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonathan TURPIN | Portfolio',
    description: 'Portfolio — projets, parcours et contact.',
    images: ['/pictures/socials/banner.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(getBaseUrl()),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0C0E11',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${jetBrainsMono.variable}`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
