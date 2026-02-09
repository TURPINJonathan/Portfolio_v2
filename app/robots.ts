import type { MetadataRoute } from 'next';
import { getNormalizedBaseUrl } from '@/lib/siteUrl';

export const revalidate = 86400;

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getNormalizedBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
