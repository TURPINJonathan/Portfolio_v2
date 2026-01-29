import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'À propos',
  description: 'Parcours et approche de Jonathan Turpin, développeur web fullstack.',
  canonical: '/about-me',
});

export default function AboutMePage() {
  return (
    <section className="container section">
      <h1>À propos</h1>
      <p>
        Je suis Jonathan Turpin, développeur web fullstack. J’aime construire des produits utiles, performants et
        accessibles, avec une base de code maintenable.
      </p>

      <h2 className="mt-8">Ce que je privilégie</h2>
      <ul className="mt-3 list-disc pl-5">
        <li>Sémantique HTML et accessibilité (a11y) dès le départ</li>
        <li>Performance (Core Web Vitals), qualité front et back</li>
        <li>SEO technique propre (metadata, canonical, robots/sitemap)</li>
        <li>DX et maintenabilité (TypeScript, composants réutilisables)</li>
      </ul>
    </section>
  );
}
