import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, CircularText, DotList, GradientText, JsonLd, TechBadge } from '@components';
import { PROFILE_HARD_SKILLS, ProjectItem, PROJECTS_LIST } from '@constants';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getProjectJsonLd } from '@/lib/seo/structuredData';

import styles from './page.module.scss';
import { Context, Ecosystem, Feature, Offline, Target } from '@/assets/icons';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS_LIST.find((project) => project.slug === slug);
}

export function generateStaticParams(): Array<{ slug: string }> {
  return PROJECTS_LIST.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createPageMetadata({
      title: 'Projet introuvable',
      description: "Ce projet n'existe pas (ou a été déplacé).",
      canonical: `/projects/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${project.name} | Projet`,
    description: project.overview,
    canonical: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentYear = new Date().getFullYear();
  const startYear = project.dates.start;
  const endValue = project.dates.end;
  const endDateTime = endValue === undefined ? String(currentYear) : endValue === null ? null : String(endValue);
  const endLabel = endValue === undefined ? 'aujourd’hui' : endValue === null ? null : String(endValue);

  const structuredData = getProjectJsonLd(project);

  const hasLiveUrl = typeof project.url === 'string' && project.url.length > 0;

  const circularTextLabel = hasLiveUrl ? 'SITE EN LIGNE * CLIQUEZ ICI * ' : 'HORS LIGNE * INDISPONIBLE * ';
  const circularTextClassName = hasLiveUrl
    ? 'text-cyan-300/95 drop-shadow-[0_0_22px_rgba(34,211,238,0.35)]'
    : 'text-slate-400/80 opacity-70 cursor-default';

  const hardSkillByLabel = new Map(PROFILE_HARD_SKILLS.map((skill) => [skill.label, skill] as const));

  const resolvedTechnologies = project.technologies
    .map((rawTech) => ({
      rawTech,
      hardSkill: hardSkillByLabel.get(rawTech),
    }))
    .filter((item) => item.rawTech.length > 0);

  const technologyBadges = resolvedTechnologies.flatMap((item) => {
    if (!item.hardSkill) return [];

    return [
      {
        label: item.hardSkill.label,
        icon: item.hardSkill.logo,
      },
    ];
  });

  const unknownTechnologies = resolvedTechnologies.filter((item) => !item.hardSkill).map((item) => item.rawTech);

  return (
    <>
      <JsonLd id={`jsonld-project-${project.slug}`} data={structuredData} />

      <section className="container section flex flex-col gap-4">
        <header className="flex flex-col gap-4 justify-center items-center">
          <h1 className={`${styles.projectHeaderTitle} text-center`}>
            <GradientText
              as="span"
              colors={['#484080', '#7462a8', '#f8c6fb', '#7462a8', '#484080']}
              animationSpeed={8}
              showBorder={false}
            >
              {project.name}
            </GradientText>
          </h1>

          <p className="text-center italic max-w-[85ch]">{project.overview}</p>
        </header>

        <figure className={styles.projectDetailContainer} aria-label={`Illustration du projet ${project.name}`}>
          <figcaption className="sr-only">Bannière et logo du projet {project.name}</figcaption>
          <Image
            src={project.banner}
            alt={`Bannière du projet ${project.name}`}
            fill
            priority
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 1200px"
            className={styles.projectHeaderBanner}
          />

          <div className={styles.projectHeaderContent}>
            <Image src={project.logo} alt={`Logo du projet ${project.name}`} className={styles.projectHeaderLogo} />
            <p className="text-sm italic">
              <time dateTime={String(startYear)}>{startYear}</time>
              {endLabel === null ? null : (
                <>
                  {' - '}
                  <time dateTime={endDateTime ?? undefined}>{endLabel}</time>
                </>
              )}
            </p>
          </div>
        </figure>

        <section className="flex flex-wrap gap-4" aria-labelledby="project-tech-title">
          <h2 id="project-tech-title" className="sr-only">
            Technologies utilisées
          </h2>

          <div className="projectDetailContainer basis-[250px] flex-1 min-h-[200px]">
            <ul className="flex h-full flex-wrap items-center justify-center gap-4" aria-label="Technologies">
              {technologyBadges.map((badge) => (
                <li key={badge.label}>
                  <TechBadge icon={badge.icon} label={badge.label} />
                </li>
              ))}

              {unknownTechnologies.map((tech) => (
                <li key={tech}>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-2 flex basis-[465px] flex-col gap-4">
            <section
              className="projectDetailContainer relative flex-1 overflow-hidden"
              aria-labelledby="project-context"
            >
              <div className="relative z-10">
                <h2 id="project-context">Contexte</h2>
                <p>{project.details.context}</p>
              </div>

              <Image
                src={Context}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute h-[150%] w-auto bottom-[-45%] left-[-15%] z-0 opacity-15"
              />
            </section>

            <div className="flex-1 flex-wrap flex gap-4">
              <section className="projectDetailContainer basis-[400px] flex-3" aria-labelledby="project-objective">
                <h2 id="project-objective">Objectif</h2>
                <p>{project.details.objective}</p>
              </section>

              <div className="projectDetailContainer relative basis-[165px] flex-1 flex justify-center items-center">
                <div aria-hidden="true">
                  <CircularText
                    text={circularTextLabel}
                    onHover={hasLiveUrl ? 'speedUp' : 'pause'}
                    spinDuration={20}
                    paused={!hasLiveUrl}
                    className={circularTextClassName}
                  />
                </div>
                {hasLiveUrl ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Ouvrir le site du projet ${project.name} (nouvel onglet)`}
                    className="absolute flex h-full w-full items-center justify-center"
                  >
                    <Image
                      src={Target}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full max-w-[100px] max-h-[100px] object-contain"
                    />
                  </a>
                ) : (
                  <div className="absolute flex h-full w-full items-center justify-center">
                    <span className="sr-only">Site du projet non disponible</span>
                    <Image
                      src={Offline}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full max-w-[100px] max-h-[100px] object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="flex gap-4" aria-labelledby="project-features">
          <div className="projectDetailContainer relative overflow-hidden flex-2 min-h-[200px]">
            <Image
              src={Feature}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute h-[150%] w-auto bottom-[-45%] right-[-15%] z-0 opacity-15"
            />

            <div className="flex-1">
              <h2 id="project-features">Fonctionnalités clés</h2>
              <DotList items={project.details.keyFeatures} />
            </div>
          </div>
        </section>

        <section className="flex flex-wrap gap-4" aria-label="Écosystème et qualité">
          <section
            className="projectDetailContainer relative overflow-hidden basis-[400px] flex-1"
            aria-labelledby="project-ecosystem"
          >
            <Image
              src={Ecosystem}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute h-[150%] w-auto bottom-[-45%] left-[-15%] z-0 opacity-15"
            />
            <h2 id="project-ecosystem">Écosystème & intégrations</h2>
            <DotList items={project.details.ecosystem} />
          </section>

          <section className="projectDetailContainer basis-[400px] flex-1" aria-labelledby="project-quality">
            <h2 id="project-quality">Qualité & contraintes</h2>
            <DotList items={project.details.quality} />
          </section>
        </section>

        <nav className="flex justify-center" aria-label="Navigation des projets">
          <Button href="/projects/list" variant="accent" className="!min-w-[170px] justify-center">
            Retour aux projets
          </Button>
        </nav>
      </section>
    </>
  );
}
