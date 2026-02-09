import type { StaticImageData } from 'next/image';

import {
  BannerAVH,
  BannerCO,
  BannerPortfolio,
  BannerVidata,
  BannerWondermum,
  LogoAVH,
  LogoCO,
  LogoPortfolio,
  LogoVidata,
  LogoWondermum,
} from '@pictures/projects';

export interface ProjectItem {
  id: string;
  name: string;
  overview: string;
  details: {
    context: string;
    objective: string;
    keyFeatures: string[];
    ecosystem: string[];
    quality: string[];
  };
  url: string | undefined;
  technologies: string[];
  banner: StaticImageData;
  logo: StaticImageData;
  slug: string;
  dates: {
    start: number;
    end?: number | null;
  };
}

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'portfolio',
    slug: 'portfolio',
    name: 'Portfolio',
    overview:
      'Site portfolio conçu pour présenter mon profil, mes compétences et une sélection de projets, avec une expérience fluide et un socle SEO propre.',
    details: {
      context:
        'Besoin d’un support unique et à jour pour présenter mon parcours et mes réalisations, avec un rendu moderne, rapide et accessible, et une base technique facile à maintenir.',
      objective:
        'Construire un site statique/SSG performant et élégant, qui mette en avant les projets et facilite la prise de contact, tout en restant simple à faire évoluer (contenu centralisé, composants réutilisables, qualité outillée).',
      keyFeatures: [
        'Pages projets : liste + détail par slug, générées statiquement.',
        'SEO : métadonnées, JSON-LD, sitemap et robots dynamiques.',
        'Animations & UX : transitions de page et micro-interactions.',
        'Contact : formulaire de contact simple et efficace.',
        'Pages légales : mentions légales et politique de confidentialité.',
        'Qualité : ESLint, Prettier, Stylelint, Husky + lint-staged.',
      ],
      ecosystem: [
        'Déploiement simple sur Vercel.',
        'Variables d’environnement publiques pour URL du site et informations légales.',
        'Assets optimisés via Next.js (images statiques, lazy-loading, blur placeholders).',
      ],
      quality: [
        'Performance : pages pré-rendues, images optimisées, bundles maîtrisés.',
        'Accessibilité : sémantique, navigation clavier et aria sur les composants clés.',
        'Maintenabilité : composants UI isolés et conventions de code homogènes.',
      ],
    },
    dates: {
      start: 2026,
      end: undefined,
    },
    url: 'https://jonathan-turpin.fr',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    banner: BannerPortfolio,
    logo: LogoPortfolio,
  },
  {
    id: 'concierge-organizer',
    slug: 'concierge-organizer',
    name: 'Concierge Organizer',
    overview: 'Application métier dédiée aux conciergeries d’hôtels de luxe.',
    details: {
      context:
        'Dans l’hôtellerie de luxe, la qualité de service dépend d’une transmission de qualité irréprochable : demandes clients, réservations, recommandations, consignes et suivi des actions doivent rester clairs, traçables et partagés entre la loge, le Front Desk et le client final.',
      objective:
        'Centraliser l’activité de conciergerie dans un outil unique, paramétrable selon l’organisation de l’établissement, pour sécuriser l’information et accélérer l’exécution au quotidien. Permettre de communiquer efficacement avec les clients et les prestataires, tout en offrant une expérience fluide et personnalisée.',
      keyFeatures: [
        "Personnalisation de l'outil au maximum afin de s'adapter au mieux à l'organisation de la loge et du Front Desk.",
        'Registres de services modulables pour coller au workflow de l’équipe.',
        'Itinéraire client : tous les services du séjour regroupés dans un dossier unique.',
        'Consignes “pass on” : diffusion et assignation (équipe, personne, service).',
        'Checklists quotidiennes générées automatiquement à partir de tâches récurrentes.',
        'Détection d’événements temporaires pendant le séjour et suggestions au concierge.',
        'Livraisons / courrier : traçabilité des entrées/sorties à la loge.',
        'Services liés : association de demandes pour ne rien manquer en cas de changement/annulation.',
        'Reminders visuels : pop-ups programmables.',
        'Confirmations : modèles prêts à l’emploi adaptés aux usages hôteliers.',
        'Rapports en 1 clic : export PDF/Excel.',
        'Communications externes: avec les prestataires (transport en direct par exemple) ou avec les clients (email, SMS, WhatsApp) pour fluidifier les échanges et confirmations.',
        'Dashboard de suivi d’activité et de performance de la conciergerie.',
      ],
      ecosystem: [
        'Communication depuis l’application (impressions, emails, SMS, WhatsApp) pour fluidifier confirmations et échanges',
        'Interfaces sécurisées avec d’autres systèmes et prestataires (PMS, gestionnaires de tâches, transport/limousine, etc.)',
      ],
      quality: [
        'Traçabilité : informations partagées et historisées pour des transmissions fiables',
        'Paramétrabilité : adaptation aux usages de la loge et du Front Desk',
        'Sécurité : échanges et interopérabilité sans perte de données',
      ],
    },
    url: 'https://conciergeorganizer.com/fr/',
    dates: {
      start: 2022,
      end: 2025,
    },
    technologies: ['Vue.js', 'Symfony', 'MySQL', 'Docker', 'Quasar'],
    banner: BannerCO,
    logo: LogoCO,
  },
  {
    id: 'wondermum-app',
    name: 'Wondermum',
    slug: 'wondermum',
    overview: 'Application mobile d’entraide et d’activités pour simplifier le quotidien des parents.',
    details: {
      context:
        'Entre organisation, charge mentale et besoin de soutien, le quotidien des parents laisse peu de place à l’improvisation. Wondermum propose une application pensée comme un compagnon de parentalité, au croisement du service, du contenu et de la communauté.',
      objective:
        'Faciliter la vie des familles en regroupant au même endroit : entraide entre parents, échanges, idées d’activités, ateliers et bons plans. Permettre de créer des connexions authentiques au sein d’une communauté bienveillante, tout en offrant des ressources pratiques pour accompagner les parents dans leurs défis quotidiens.',
      keyFeatures: [
        'Entraide entre parents : services et coups de main du quotidien (garde, devoirs, rencontres, etc.)',
        'Chat intégré : échanges simples et continus au sein d’une communauté bienveillante',
        'Ateliers en famille : activités adaptées à tous les âges pour créer des moments partagés',
        'Conseils & contenus : recommandations et astuces pour accompagner la parentalité',
        'Bons plans : offres et avantages utiles pour la vie de famille',
        'Système de points : participation et entraide récompensées',
      ],
      ecosystem: [
        'Application disponible sur iOS et Android.',
        'Communauté et échanges intégrés (chat, entraide).',
        'Paiement en ligne via Stripe.',
        'Système de fidélité par points et avantages associés.',
      ],
      quality: [
        'Clarté UX : parcours simples et lisibles sur mobile',
        'Communauté : mise en avant d’échanges bienveillants',
        'Éco-conception : attention portée à la sobriété (mentionnée sur le site)',
      ],
    },
    url: 'https://wondermum-app.fr/',
    dates: {
      start: 2025,
      end: null,
    },
    technologies: ['Symfony', 'React Native', 'MySQL', 'Expo', 'Stripe', 'Ios', 'Android'],
    banner: BannerWondermum,
    logo: LogoWondermum,
  },
  {
    id: 'avh',
    name: 'AVH',
    slug: 'avh',
    overview: 'Site institutionnel de l’Association Valentin Haüy.',
    details: {
      context:
        'L’Association Valentin Haüy est un acteur historique de l’aide aux personnes déficientes visuelles. Le site doit à la fois informer (présentation, histoire, actualités) et faciliter l’engagement (don, bénévolat) avec une navigation claire.',
      objective:
        "Permettre à l'AVH Caen Calvados de présenter son association, son histoire, ses actualités et de faciliter l’engagement du public (don, bénévolat) à travers un site institutionnel clair, accessible et évolutif. La gestion de contenu doit être simple pour l’équipe, avec une structure adaptée à l’ajout de nouvelles rubriques et d’actualités au fil du temps. Le site se devait d'être accessible à tous, avec une attention particulière portée à la lisibilité, la hiérarchie sémantique et les interactions clavier.",
      keyFeatures: [
        'Page de présentation : contexte, histoire, film institutionnel et ressources associées.',
        'Actualités : mise en avant des dernières informations et activités.',
        'Engagement : accès simplifié aux actions de soutien (don / bénévolat).',
        'Gestion de contenu : interface d’administration pour une mise à jour autonome et régulière via EasyAdmin4.',
        'Navigation claire : menu structuré et parcours utilisateur optimisé pour faciliter l’accès à l’information et à l’engagement pour tous les publics.',
      ],
      ecosystem: [
        'Points d’entrée structurants : don, bénévolat, boutique, implantations, contact',
        'Contenus éditoriaux évolutifs (présentation, histoire, actualités)',
      ],
      quality: [
        'Accessibilité : lisibilité, hiérarchie sémantique, interactions clavier',
        'Performance : pages rapides et stables malgré une forte densité de contenu',
        'Évolutivité : structure adaptée à l’ajout de rubriques et d’actualités',
      ],
    },
    url: undefined,
    dates: {
      start: 2021,
      end: 2024,
    },
    technologies: ['Symfony', 'React', 'MySQL'],
    banner: BannerAVH,
    logo: LogoAVH,
  },
  {
    id: 'vidata',
    name: 'Vidata',
    slug: 'vidata',
    overview: 'Plateforme de vidéos personnalisées pour améliorer acquisition, fidélisation et service client.',
    details: {
      context:
        'Vidata propose une solution qui automatise la création de vidéos personnalisées à grande échelle, à partir de données (CRM, produits, langues, segments) pour renforcer la performance des campagnes marketing et la relation client.',
      objective:
        'Permettre de générer rapidement des vidéos 1‑to‑1 et de les activer sur les bons canaux (email, SMS, paid media, retargeting, réseaux sociaux) avec un socle fiable et sécurisé.',
      keyFeatures: [
        'Automation : génération en masse en quelques secondes',
        'Flexibilité : diffusion multi-canale et multi-formats',
        'Mesure : suivi de l’impact et collecte de feedback (questionnaires en fin de vidéo)',
      ],
      ecosystem: [
        'API sécurisée pour connecter données (CRM, produits, langues, etc.)',
        'Activation multi-canale (email, SMS, paid media, retargeting, réseaux sociaux)',
        'Cas d’usage : acquisition, onboarding & fidélisation, support client',
        'Player vidéo maison avec fonctionnalités avancées (questionnaires, call-to-action, production de statistiques, etc.)',
      ],
      quality: [
        'Sécurité : intégration et traitement des données via une API sécurisée',
        'Scalabilité : génération de volumes importants sans dégrader la stabilité',
        'Mesure : boucles de feedback pour piloter la performance',
      ],
    },
    url: 'https://vidata.io/',
    dates: {
      start: 2026,
    },
    technologies: ['C#', '.NET', 'Azure', 'Angular', 'Docker'],
    banner: BannerVidata,
    logo: LogoVidata,
  },
];
