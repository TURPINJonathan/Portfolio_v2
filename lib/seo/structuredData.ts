import { getNormalizedBaseUrl } from '@/lib/siteUrl';

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
