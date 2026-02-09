import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { ProjectItem } from '@constants';

import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: ProjectItem;
  enterDelay?: number;
  priorityImage?: boolean;
}

export default function ProjectCard({ project, enterDelay = 0, priorityImage = false }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;
  const titleId = `project-title-${project.id}`;
  const overviewId = `project-overview-${project.id}`;
  const style = { ['--enter-delay']: `${enterDelay}s` } as CSSProperties;

  return (
    <article className={styles.card} aria-labelledby={titleId} style={style}>
      <div className={styles.banner}>
        <Link href={href} className={styles.stretchedLink} aria-labelledby={titleId} aria-describedby={overviewId} />
        <Image
          src={project.banner}
          alt={`Bannière du projet ${project.name}`}
          fill
          sizes="(min-width: 1024px) 520px, (min-width: 700px) 50vw, 100vw"
          className={styles.bannerImage}
          priority={priorityImage}
        />
        <div className={styles.bannerOverlay} aria-hidden="true" />

        <div className={styles.bannerContent}>
          {project.logo ? (
            <div className={styles.logoLayer} aria-hidden="true">
              <Image src={project.logo} alt="" aria-hidden={true} className={styles.logoImage} />
            </div>
          ) : null}
          <div className={styles.text}>
            <h3 id={titleId} className={styles.title}>
              {project.name}
            </h3>
            <p id={overviewId} className={styles.overview}>
              {project.overview}
            </p>
          </div>

          <div className={styles.actions}>
            <span className={`tap-target btn btn-size-sm btn-default ${styles.cta}`} aria-hidden="true">
              Voir le projet
            </span>
          </div>
        </div>
      </div>

      <div className={styles.chrome} aria-hidden="true" />
    </article>
  );
}
