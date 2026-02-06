import { createPageMetadata } from '@/lib/seo/metadata';
import { PROJECTS_LIST } from '@constants';
import { GradientText, ProjectCard } from '@components';

import styles from './page.module.scss';

export const metadata = createPageMetadata({
  title: 'Projets',
  description:
    'Sélection de projets réalisés en freelance, en entreprise et en projets personnels : front-end, back-end, performance, SEO et accessibilité.',
  canonical: '/projects/list',
});

export default function ProjectsList() {
  return (
    <section className="container section">
      <h1 className="text-center">
        <GradientText
          as="span"
          colors={['#484080', '#7462a8', '#f8c6fb', '#7462a8', '#484080']}
          animationSpeed={8}
          showBorder={false}
        >
          Les projets
        </GradientText>
      </h1>

      <p className="leading-relaxed italic text-center">Quelques projets sur lesquels j’ai pu travailler.</p>

      <ul className={styles.grid}>
        {PROJECTS_LIST.map((project, index) => (
          <li key={project.id} className={styles.item}>
            <ProjectCard project={project} enterDelay={0.06 + index * 0.08} priorityImage={index < 2} />
          </li>
        ))}
      </ul>
    </section>
  );
}
