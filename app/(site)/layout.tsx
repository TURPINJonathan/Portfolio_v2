import FooterLayout from '@layout/Footer';
import HeaderLayout from '@/app/(layout)/(header)/Header';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>

      <HeaderLayout />
      <main id="main-content">{children}</main>
      <FooterLayout />
    </>
  );
}
