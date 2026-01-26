import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projets',
  description: 'Liste de projets du portfolio.',
};

export default function ProjectsList() {
  return (
    <section className="container section">
      <h1>Mes projets</h1>
      <p>Ma liste de projets.</p>
    </section>
  );
}
