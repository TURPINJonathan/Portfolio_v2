import type { Metadata } from 'next';

const DEFAULT_OG_IMAGES = [
  {
    url: '/pictures/socials/banner.png',
    alt: 'Jonathan Turpin — Développeur web fullstack',
  },
  {
    url: '/pictures/socials/business_card.png',
    alt: 'Jonathan Turpin — Développeur web fullstack',
  },
];

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
      siteName: 'Jonathan TURPIN',
      locale: 'fr_FR',
      type: 'website',
      images: DEFAULT_OG_IMAGES,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/pictures/socials/banner.png'],
    },
  };
}
