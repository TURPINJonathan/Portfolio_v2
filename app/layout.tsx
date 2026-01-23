import '@app/globals.scss';
import FooterLayout from '@layout/Footer';
import HeaderLayout from '@layout/Header';
import { IBM_Plex_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${jetBrainsMono.variable}`}>
        <HeaderLayout />

        <main>{children}</main>

        <FooterLayout />
      </body>
    </html>
  );
}
