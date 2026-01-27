import FooterLayout from '@layout/Footer';
import HeaderLayout from '@/app/(layout)/(header)/Header';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>

      <HeaderLayout />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <FooterLayout />
    </div>
  );
}
