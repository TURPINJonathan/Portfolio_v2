# Portfolio

Site portfolio construit avec Next.js (App Router) pour présenter un profil, des projets et des pages de contact/légal, avec une UI moderne et des animations.

## Objectif

- Mettre en avant des réalisations de façon structurée (contexte, objectif, fonctionnalités, écosystème, qualité).
- Proposer un parcours simple : accueil → projets → détail → contact.
- Garder une base propre et maintenable (TypeScript, lint/format, styles cohérents).

## Fonctionnalités

- Pages : accueil, à-propos, liste de projets, détail par slug, contact, pages légales.
- Données projets centralisées (contenu + techno + médias) pour un rendu cohérent.
- SEO : sitemap/robots, composants SEO (JSON-LD).
- Expérience : transitions de page et animations.

## Stack

- Next.js 16 + React 19 + TypeScript
- Styles : SCSS + Tailwind CSS
- Animations : Motion + GSAP
- Qualité : ESLint, Prettier, Stylelint, Husky + lint-staged

## Démarrage

Installer les dépendances :

```bash
npm install
```

Lancer en dev :

```bash
npm run dev
```

Build de prod :

```bash
npm run build
npm run start
```

Vérifications qualité :

```bash
npm run check
```

Auto-fix (format + lint + stylelint) :

```bash
npm run fix
```

## Environnements (.env)

Next.js charge automatiquement les variables selon le mode :

- `npm run dev` → `.env.development`
- `npm run build` / `npm run start` → `.env.production`

Fichiers fournis :

- `.env.example` : modèle (à copier si besoin)
- `.env.production.example` : modèle prod (à copier en `.env.production` pour tester la prod en local)

Notes Vercel :

- En **Production**, définis `NEXT_PUBLIC_SITE_URL=https://jonathan-turpin.fr` dans Vercel.
- En **Preview**, tu peux ne pas définir `NEXT_PUBLIC_SITE_URL` : le site utilise `VERCEL_URL` pour construire les URLs (sitemap/robots/JSON-LD).

### Variables supportées

Toutes les variables `NEXT_PUBLIC_*` sont exposées côté navigateur (elles ne doivent donc pas contenir de secrets).

| Variable                                    | Requis    | Description                                                                                                                              |
| ------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                      | Prod: oui | URL canonique du site (sert à `metadataBase`, sitemap, robots, JSON-LD). En Preview Vercel, peut être omise (fallback sur `VERCEL_URL`). |
| `NEXT_PUBLIC_SITE_NAME`                     | non       | Nom du site utilisé dans les pages légales/metadata.                                                                                     |
| `NEXT_PUBLIC_DEFAULT_LOCALE`                | non       | Locale par défaut (ex: `fr-FR`).                                                                                                         |
| `NEXT_PUBLIC_DEFAULT_TIME_ZONE`             | non       | Fuseau horaire par défaut (ex: `Europe/Paris`).                                                                                          |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`      | non       | Vérification Google Search Console (champ `verification.google`).                                                                        |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`           | non       | Réservé (non consommé par défaut dans le code).                                                                                          |
| `NEXT_PUBLIC_LINKEDIN_URL`                  | non       | Lien LinkedIn affiché dans le footer (si défini).                                                                                        |
| `NEXT_PUBLIC_MALT_URL`                      | non       | Lien Malt affiché dans le footer (si défini).                                                                                            |
| `NEXT_PUBLIC_GITHUB_URL`                    | non       | Lien GitHub affiché dans le footer (si défini).                                                                                          |
| `NEXT_PUBLIC_CONTACT_EMAIL`                 | non       | Email de contact (liens `mailto:` + éditeur légal).                                                                                      |
| `NEXT_PUBLIC_CONTACT_PHONE`                 | non       | Téléphone de contact (liens `tel:` + éditeur légal).                                                                                     |
| `NEXT_PUBLIC_LEGAL_OWNER_NAME`              | non       | Nom du responsable/éditeur (défaut: ton nom).                                                                                            |
| `NEXT_PUBLIC_LEGAL_PUBLISHER_ADDRESS`       | non       | Adresse de l’éditeur (mentions légales).                                                                                                 |
| `NEXT_PUBLIC_LEGAL_PUBLISHER_SIRET`         | non       | SIRET (si applicable).                                                                                                                   |
| `NEXT_PUBLIC_LEGAL_HOST_NAME`               | non       | Hébergeur (ex: Vercel).                                                                                                                  |
| `NEXT_PUBLIC_LEGAL_HOST_ADDRESS`            | non       | Adresse de l’hébergeur.                                                                                                                  |
| `NEXT_PUBLIC_LEGAL_HOST_PHONE`              | non       | Téléphone de l’hébergeur (optionnel).                                                                                                    |
| `NEXT_PUBLIC_LEGAL_HOST_WEBSITE`            | non       | Site web de l’hébergeur.                                                                                                                 |
| `NEXT_PUBLIC_LEGAL_JURISDICTION_CITY`       | non       | Ville de juridiction (mentions légales).                                                                                                 |
| `NEXT_PUBLIC_PRIVACY_DATA_CONTROLLER_EMAIL` | non       | Email RGPD (fallback: `NEXT_PUBLIC_CONTACT_EMAIL`).                                                                                      |
| `NEXT_PUBLIC_PRIVACY_DATA_RETENTION_PERIOD` | non       | Durée de conservation (ex: `12 mois`).                                                                                                   |

## Où modifier le contenu

- Projets : `constants/projects.ts`
- Liens (navigation / contact) : `constants/*.ts`
- Assets (logos/bannières) : `assets/` et `public/`

## Structure (repères)

- `app/(layout)` : header/footer
- `app/(site)` : pages du site (dont `projects/` et pages légales)
- `components/` : composants UI (transitions, cards, badges, SEO, etc.)
- `lib/seo/` : helpers SEO (metadata/structured data)

## Déploiement (Vercel)

Ce projet se déploie simplement sur Vercel.

1. Importer le repo dans Vercel

- Framework preset : **Next.js**
- Build command : `npm run build`
- Output : (auto)

2. Configurer les variables d’environnement

⚠️ Recommandé : définir `NEXT_PUBLIC_SITE_URL` (utilisé par `sitemap.xml` et `robots.txt`).

Exemples :

- `NEXT_PUBLIC_SITE_URL=https://ton-domaine.fr`
- `NEXT_PUBLIC_SITE_NAME=Ton Nom`

Pour les pages légales, tu peux aussi renseigner (optionnel mais conseillé) :

- `NEXT_PUBLIC_LEGAL_OWNER_NAME`
- `NEXT_PUBLIC_LEGAL_PUBLISHER_ADDRESS`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_LEGAL_HOST_NAME`
- `NEXT_PUBLIC_LEGAL_HOST_ADDRESS`
- `NEXT_PUBLIC_LEGAL_HOST_PHONE`
- `NEXT_PUBLIC_LEGAL_HOST_WEBSITE`

3. Déployer

Vercel build + déploie automatiquement à chaque push sur la branche suivie.
