import "@app/globals.scss";
import FooterLayout from "@layout/Footer";
import HeaderLayout from "@layout/Header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <HeaderLayout />

        <main>{children}</main>

        <FooterLayout />
      </body>
    </html>
  );
}
