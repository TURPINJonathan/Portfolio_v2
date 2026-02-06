import type { MetadataRoute } from 'next';
import { getNormalizedBaseUrl } from '@/lib/siteUrl';
import { PROJECTS_LIST } from '@constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getNormalizedBaseUrl();
  const latestProjectYear = PROJECTS_LIST.reduce((maxYear, project) => Math.max(maxYear, project.year), 0);

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-me`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projects/list`,
      lastModified: latestProjectYear ? new Date(Date.UTC(latestProjectYear, 11, 31)) : undefined,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...PROJECTS_LIST.map((project) => ({
      url: `${baseUrl}/projects/${project.url}`,
      lastModified: new Date(Date.UTC(project.year, 11, 31)),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/legal-notices`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
