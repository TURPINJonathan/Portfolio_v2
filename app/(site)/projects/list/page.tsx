import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Projets',
  description: 'Liste de projets du portfolio.',
  canonical: '/projects/list',
});

export default function ProjectsList() {
  return (
    <section className="container section">
      <h1>Mes projets</h1>
      <p>Ma liste de projets.</p>
    </section>
  );
}
