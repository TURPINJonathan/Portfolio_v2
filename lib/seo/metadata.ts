import type { Metadata } from 'next';

export interface CreatePageMetadataInput {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  canonical,
  keywords,
  noIndex,
}: CreatePageMetadataInput): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
  };
}
