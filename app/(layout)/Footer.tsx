import { getCurrentYear, getMonth } from '@utils';
import { CONTACT_LINKS } from '@constants';
import { Button } from '@components';
import Link from 'next/link';

export default function FooterLayout() {
  const month = getMonth('string', true, undefined, { length: 'long' });
  const year = getCurrentYear();
  const currentDate = `${month} ${year}`;
  const links = CONTACT_LINKS;

  return (
    <footer className="w-full pb-4 text-xs">
      <div className="container">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <section
            className="order-1 flex flex-col items-center gap-1 text-center sm:order-2 sm:flex-[2]"
            aria-labelledby="footer-owner"
          >
            <h2 id="footer-owner" className="sr-only">
              Auteur du site
            </h2>
            <span className="font-medium">Jonathan TURPIN</span>
            <span>Développeur fullstack</span>
          </section>

          <section
            className="order-2 flex flex-col items-center gap-1 text-center sm:order-3 sm:flex-1 sm:items-end sm:text-right"
            aria-labelledby="footer-social"
          >
            <h2 id="footer-social" className="sr-only">
              Me contacter
            </h2>

            {links.length > 0 && (
              <ul
                className="flex flex-wrap items-center justify-center gap-2 sm:justify-end"
                aria-label="Liens de contact"
              >
                {links.map((link) => (
                  <li key={link.key}>
                    <Button
                      href={link.href}
                      variant="primary"
                      isOutline
                      size="xs"
                      disabled={!link.href}
                      ariaLabel={`${link.label}${link.href ? '' : ' (non configuré)'}`}
                      external={link.isExternal}
                    >
                      <link.Icon
                        aria-hidden={true}
                        focusable={false}
                        className={`h-4 w-4 origin-center${link.key === 'malt' ? ' scale-150' : ''}`}
                      />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section
            className="order-3 flex flex-col items-center gap-1 text-center sm:order-1 sm:flex-1 sm:items-start sm:text-left"
            aria-labelledby="footer-legal"
          >
            <h2 id="footer-legal" className="sr-only">
              Mentions légales
            </h2>
            <nav aria-label="Liens légaux">
              <Link href="/legal-notices" className="font-medium focus-visible:underline focus-visible:outline-none">
                Mentions légales
              </Link>
            </nav>
            <span>&copy; Janvier 2026 &middot; {currentDate}</span>
          </section>
        </div>
      </div>
    </footer>
  );
}
