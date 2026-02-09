import { getNormalizedBaseUrl } from '@/lib/siteUrl';
import type { ProjectItem } from '@constants';

export function getHomeJsonLd() {
  const baseUrl = getNormalizedBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: 'Jonathan TURPIN | Portfolio',
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Jonathan Turpin',
        jobTitle: 'Développeur web fullstack',
        url: `${baseUrl}/`,
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/#webpage`,
        url: `${baseUrl}/`,
        name: 'Développeur web fullstack',
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        about: {
          '@id': `${baseUrl}/#person`,
        },
        inLanguage: 'fr-FR',
      },
    ],
  };
}

export function getProjectJsonLd(project: ProjectItem) {
  const baseUrl = getNormalizedBaseUrl();
  const pageUrl = `${baseUrl}/projects/${project.slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: 'Jonathan TURPIN | Portfolio',
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Jonathan Turpin',
        jobTitle: 'Développeur web fullstack',
        url: `${baseUrl}/`,
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: project.name,
        description: project.overview,
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        about: {
          '@id': `${baseUrl}/#person`,
        },
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'CreativeWork',
        '@id': `${pageUrl}#project`,
        url: pageUrl,
        name: project.name,
        description: project.overview,
        author: {
          '@id': `${baseUrl}/#person`,
        },
        creator: {
          '@id': `${baseUrl}/#person`,
        },
        keywords: project.technologies?.length ? project.technologies.join(', ') : undefined,
        image: `${baseUrl}/pictures/socials/banner.png`,
      },
    ],
  };
}

export function getProjectsListJsonLd(projects: readonly ProjectItem[]) {
  const baseUrl = getNormalizedBaseUrl();
  const pageUrl = `${baseUrl}/projects/list`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: 'Jonathan TURPIN | Portfolio',
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Projets',
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#itemlist`,
        url: pageUrl,
        name: 'Liste des projets',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: project.name,
          url: `${baseUrl}/projects/${project.slug}`,
        })),
      },
    ],
  };
}
