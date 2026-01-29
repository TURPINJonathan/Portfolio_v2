import { CONTACT_LINKS } from '@constants';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Contact',
  description: 'Contactez Jonathan Turpin (email, téléphone, LinkedIn, GitHub).',
  canonical: '/contact',
});

export default function ContactPage() {
  const links = CONTACT_LINKS.filter((link) => Boolean(link.href));

  return (
    <section className="container section">
      <h1>Contact</h1>
      <p>Le plus simple : LinkedIn ou email. Je réponds généralement rapidement.</p>

      {links.length > 0 ? (
        <ul aria-label="Moyens de contact" className="mt-6 flex flex-wrap gap-3">
          {links.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noreferrer noopener' : undefined}
                className="btn btn-size-sm btn-primary btn-outline"
              >
                <span className="sr-only">{link.label}</span>
                <link.Icon aria-hidden={true} focusable={false} className="h-5 w-5" />
                <span className="ml-2">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6">
          Aucun lien de contact n’est configuré. Renseigne les variables d’environnement publiques (ex.{' '}
          <code>NEXT_PUBLIC_CONTACT_EMAIL</code>, <code>NEXT_PUBLIC_LINKEDIN_URL</code>…).
        </p>
      )}
    </section>
  );
}
