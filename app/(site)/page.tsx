import type { Metadata } from 'next';
import { Button } from '@components';

export const metadata: Metadata = {
  title: 'Développeur fullstack',
  description:
    'Portfolio — développement web, projets, expertise front-end et back-end. Découvre mes réalisations et les technologies que j’utilise.',
};

export default function Home() {
  return (
    <div className="container section">
      <header>
        <h1>Jonathan TURPIN | Développeur fullstack</h1>
        <p>
          Je conçois des interfaces modernes, rapides et accessibles, avec une attention particulière à la qualité
          (performance, SEO, design system) et à l’expérience utilisateur.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button href="/projects/list" variant="accent">
            Voir les projets
          </Button>
          <Button href="/projects/list" appearance="ghost" variant="primary">
            Parcourir le portfolio
          </Button>
        </div>
      </header>

      <section aria-labelledby="home-about" className="mt-8">
        <h2 id="home-about">Ce que tu trouveras ici</h2>
        <p>
          Une sélection de projets (front, full-stack, UI), des choix techniques expliqués, et une base propre
          (accessibilité, balisage sémantique, metadata Next.js).
        </p>
      </section>

      <section aria-labelledby="home-skills" className="mt-6">
        <h2 id="home-skills">Compétences & stack</h2>
        <p>
          Next.js / React / TypeScript, styles SCSS, composants réutilisables, et une approche orientée produit :
          itérations rapides, design cohérent, et code maintenable.
        </p>
      </section>

      <section aria-labelledby="home-projects" className="mt-6">
        <h2 id="home-projects">Derniers projets</h2>
        <p>
          Tu peux commencer par la liste des projets : elle sert de point d’entrée principal et sera enrichie au fil du
          temps.
        </p>
        <div className="mt-3">
          <Button href="/projects/list" isOutline variant="accent">
            Accéder à la liste
          </Button>
        </div>
      </section>
    </div>
  );
}
