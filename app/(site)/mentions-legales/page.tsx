import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Mentions légales',
  description: 'Mentions légales du site portfolio de Jonathan Turpin.',
  canonical: '/mentions-legales',
});

export default function LegalNoticePage() {
  return (
    <section className="container section">
      <h1>Mentions légales</h1>
      <p>
        Cette page regroupe les informations légales du site. Certaines informations (hébergeur, adresse, etc.) peuvent
        dépendre de ton mode de déploiement et sont à compléter si nécessaire.
      </p>

      <h2 className="mt-8">Éditeur du site</h2>
      <p>Jonathan Turpin — développeur web fullstack.</p>

      <h2 className="mt-8">Hébergement</h2>
      <p>À compléter selon l’hébergeur utilisé (ex. Vercel, OVH…).</p>

      <h2 className="mt-8">Propriété intellectuelle</h2>
      <p>
        Sauf mention contraire, les contenus présents sur ce site (textes, visuels, code) sont protégés par le droit
        d’auteur. Toute reproduction non autorisée est interdite.
      </p>

      <h2 className="mt-8">Données personnelles</h2>
      <p>
        Ce site n’a pas vocation à collecter des données personnelles sans ton consentement. Si un outil de mesure
        d’audience ou de contact est ajouté, cette section devra être mise à jour.
      </p>

      <h2 className="mt-8">Contact</h2>
      <p>
        Utilise la page{' '}
        <a href="/contact" className="underline">
          Contact
        </a>
        .
      </p>
    </section>
  );
}
