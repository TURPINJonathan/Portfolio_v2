import '@app/globals.scss';
import '../styles/base/tailwind.css';
import FooterLayout from '@layout/Footer';
import HeaderLayout from '@/app/(layout)/(header)/Header';
import { IBM_Plex_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';

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
    default: 'Portfolio',
    template: '%s | Portfolio',
  },
  description: 'Portfolio — projets, parcours et contact.',
  openGraph: {
    title: 'Portfolio',
    description: 'Portfolio — projets, parcours et contact.',
    url: '/',
    siteName: 'Portfolio',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Portfolio',
    description: 'Portfolio — projets, parcours et contact.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${jetBrainsMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Aller au contenu
        </a>
        <HeaderLayout />

        <main id="main-content">{children}</main>

        <FooterLayout />
      </body>
    </html>
  );
}
