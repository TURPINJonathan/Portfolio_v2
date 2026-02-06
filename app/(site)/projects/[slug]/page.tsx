import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button } from '@components';
import { PROJECTS_LIST } from '@constants';
import { createPageMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getProjectBySlug(slug: string) {
  return PROJECTS_LIST.find((project) => project.url === slug);
}

export function generateStaticParams(): Array<{ slug: string }> {
  return PROJECTS_LIST.map((project) => ({ slug: project.url }));
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
    canonical: `/projects/${project.url}`,
  });
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <section className="container section">
      <div className="flex items-center gap-3">
        <Button href="/projects/list" variant="default" isOutline size="xs" ariaLabel="Retour à la liste des projets">
          Retour
        </Button>
      </div>

      <header className="mt-6">
        <h1 className="text-balance">{project.name}</h1>
        <p className="mt-2 leading-relaxed italic">{project.overview}</p>
      </header>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0C0E11]">
        <div className="relative min-h-[220px] md:min-h-[320px]">
          <Image
            src={project.banner}
            alt={`Bannière du projet ${project.name}`}
            fill
            priority
            sizes="(min-width: 768px) 900px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />

          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt={`Logo du projet ${project.name}`}
                    width={44}
                    height={44}
                    className="rounded-lg"
                  />
                ) : null}
                <p className="text-sm text-white/80">
                  <span className="font-medium text-white">Année</span> : {project.year}
                </p>
              </div>

              <ul className="flex flex-wrap gap-2" aria-label="Technologies utilisées">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/90"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-8 max-w-[72ch]">
        <h2>Détails</h2>
        <div
          className="mt-3 leading-relaxed [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1"
          dangerouslySetInnerHTML={{ __html: project.details }}
        />
      </article>
    </section>
  );
}
