export const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'fr-FR';
export const DEFAULT_TIME_ZONE = process.env.NEXT_PUBLIC_DEFAULT_TIME_ZONE ?? 'Europe/Paris';

const ownerName = process.env.NEXT_PUBLIC_LEGAL_OWNER_NAME ?? 'Jonathan Turpin';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Jonathan TURPIN';

export const LEGAL = {
  siteName,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  publisherName: ownerName,
  publisherAddress: process.env.NEXT_PUBLIC_LEGAL_PUBLISHER_ADDRESS ?? '',
  publisherEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
  publisherPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '',
  publisherSiret: process.env.NEXT_PUBLIC_LEGAL_PUBLISHER_SIRET ?? '',

  publicationDirectorName: ownerName,

  hostName: process.env.NEXT_PUBLIC_LEGAL_HOST_NAME ?? '',
  hostAddress: process.env.NEXT_PUBLIC_LEGAL_HOST_ADDRESS ?? '',
  hostPhone: process.env.NEXT_PUBLIC_LEGAL_HOST_PHONE ?? '',
  hostWebsite: process.env.NEXT_PUBLIC_LEGAL_HOST_WEBSITE ?? '',

  developerName: ownerName,
  ipOwnerName: ownerName,

  jurisdictionCity: process.env.NEXT_PUBLIC_LEGAL_JURISDICTION_CITY ?? '',

  dataControllerName: ownerName,
  dataControllerEmail:
    process.env.NEXT_PUBLIC_PRIVACY_DATA_CONTROLLER_EMAIL ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
  dataRecipients: ownerName,
  dataRetentionPeriod: process.env.NEXT_PUBLIC_PRIVACY_DATA_RETENTION_PERIOD ?? '',
} as const;
