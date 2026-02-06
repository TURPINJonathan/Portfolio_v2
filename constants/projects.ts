import type { StaticImageData } from 'next/image';

import {
  BannerAVH,
  BannerCO,
  BannerVidata,
  BannerWondermum,
  LogoAVH,
  LogoCO,
  LogoVidata,
  LogoWondermum,
} from '@pictures/projects';

export interface ProjectItem {
  id: string;
  name: string;
  overview: string;
  details: string;
  url: string;
  technologies: string[];
  year: number;
  banner: StaticImageData;
  logo?: StaticImageData;
}

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'concierge-organizer',
    name: 'Concierge Organizer',
    overview: 'Application métier dédiée aux conciergeries d’hôtellerie de luxe.',
    details: `<h3>Contexte</h3>
<p>Dans l’hôtellerie de luxe, la qualité de service dépend d’une transmission irréprochable : demandes clients, réservations, recommandations, consignes et suivi des actions doivent rester clairs, traçables et partagés entre la loge et le Front Desk.</p>

<h3>Objectif</h3>
<p>Centraliser l’activité de conciergerie dans un outil unique, paramétrable selon l’organisation de l’établissement, pour sécuriser l’information et accélérer l’exécution au quotidien.</p>

<h3>Fonctionnalités clés</h3>
<ul>
  <li>Homepage personnalisable (pilotage selon vos priorités)</li>
  <li>Registres de services modulables pour coller au workflow de l’équipe</li>
  <li>Itinéraire client : tous les services du séjour regroupés dans un dossier unique</li>
  <li>Consignes “pass on” : diffusion et assignation (équipe, personne, service)</li>
  <li>Checklists quotidiennes générées automatiquement à partir de tâches récurrentes</li>
  <li>Détection d’événements temporaires pendant le séjour et suggestions au concierge</li>
  <li>Livraisons / courrier : traçabilité des entrées/sorties à la loge</li>
  <li>Services liés : association de demandes pour ne rien manquer en cas de changement/annulation</li>
  <li>Reminders visuels : pop-ups programmables</li>
  <li>Confirmations : modèles prêts à l’emploi adaptés aux usages hôteliers</li>
  <li>Rapports en 1 clic : export PDF/Excel</li>
</ul>

<h3>Écosystème & intégrations</h3>
<ul>
  <li>Communication depuis l’application (impressions, emails, SMS, WhatsApp) pour fluidifier confirmations et échanges</li>
  <li>Interfaces sécurisées avec d’autres systèmes et prestataires (PMS, gestionnaires de tâches, transport/limo, etc.)</li>
</ul>

<h3>Qualité & contraintes</h3>
<ul>
  <li><strong>Traçabilité</strong> : informations partagées et historisées pour des transmissions fiables</li>
  <li><strong>Paramétrabilité</strong> : adaptation aux usages de la loge et du Front Desk</li>
  <li><strong>Sécurité</strong> : échanges et interopérabilité sans perte de données</li>
</ul>`,
    url: 'concierge-organizer',
    technologies: ['VueJs', 'Symfony', 'MySQL', 'Docker', 'Quasar'],
    year: 2023,
    banner: BannerCO,
    logo: LogoCO,
  },
  {
    id: 'wondermum-app',
    name: 'Wondermum',
    overview: 'Application mobile d’entraide et d’activités pour simplifier le quotidien des parents.',
    details: `<h3>Contexte</h3>
<p>Entre organisation, charge mentale et besoin de soutien, le quotidien des parents laisse peu de place à l’improvisation. Wondermum propose une application pensée comme un compagnon de parentalité, au croisement du service, du contenu et de la communauté.</p>

<h3>Objectif</h3>
<p>Faciliter la vie des familles en regroupant au même endroit : entraide entre parents, échanges, idées d’activités, ateliers et bons plans.</p>

<h3>Fonctionnalités clés</h3>
<ul>
  <li><strong>Entraide entre parents</strong> : services et coups de main du quotidien (garde, devoirs, rencontres, etc.)</li>
  <li><strong>Chat intégré</strong> : échanges simples et continus au sein d’une communauté bienveillante</li>
  <li><strong>Ateliers en famille</strong> : activités adaptées à tous les âges pour créer des moments partagés</li>
  <li><strong>Conseils & contenus</strong> : recommandations et astuces pour accompagner la parentalité</li>
  <li><strong>Bons plans</strong> : offres et avantages utiles pour la vie de famille</li>
  <li><strong>Système de points</strong> : participation et entraide récompensées</li>
</ul>

<h3>Écosystème & intégrations</h3>
<ul>
  <li>Application disponible sur <strong>iOS</strong> et <strong>Android</strong></li>
  <li>Communauté et échanges intégrés (chat, entraide)</li>
</ul>

<h3>Qualité & contraintes</h3>
<ul>
  <li><strong>Clarté UX</strong> : parcours simples et lisibles sur mobile</li>
  <li><strong>Communauté</strong> : mise en avant d’échanges bienveillants</li>
  <li><strong>Éco-conception</strong> : attention portée à la sobriété (mentionnée sur le site)</li>
</ul>`,
    url: 'wondermum-app',
    technologies: ['Symfony', 'React native', 'MySQL', 'Expo', 'EasyAdmin4', 'Stripe'],
    year: 2022,
    banner: BannerWondermum,
    logo: LogoWondermum,
  },
  {
    id: 'avh',
    name: 'AVH',
    overview: 'Site institutionnel de l’Association Valentin Haüy.',
    details: `<h3>Contexte</h3>
<p>L’Association Valentin Haüy est un acteur historique de l’aide aux personnes déficientes visuelles. Le site doit à la fois informer (présentation, histoire, actualités) et faciliter l’engagement (don, bénévolat) avec une navigation claire.</p>

<h3>Objectif</h3>
<p>Offrir une plateforme robuste et accessible, capable de mettre en valeur les missions, les contenus éditoriaux et les points d’entrée clés (faire un don, devenir bénévole, boutique, implantations, contact).</p>

<h3>Fonctionnalités clés</h3>
<ul>
  <li><strong>Page de présentation</strong> : contexte, histoire, film institutionnel et ressources associées</li>
  <li><strong>Actualités</strong> : mise en avant des dernières informations</li>
  <li><strong>Engagement</strong> : accès simplifié aux actions de soutien (don / bénévolat)</li>
  <li><strong>Accès rapide</strong> aux rubriques récurrentes (boutique, implantations, contact)</li>
</ul>

<h3>Écosystème & intégrations</h3>
<ul>
  <li>Points d’entrée structurants : <strong>don</strong>, <strong>bénévolat</strong>, boutique, implantations, contact</li>
  <li>Contenus éditoriaux évolutifs (présentation, histoire, actualités)</li>
</ul>

<h3>Qualité & contraintes</h3>
<ul>
  <li><strong>Accessibilité</strong> : lisibilité, hiérarchie sémantique, interactions clavier</li>
  <li><strong>Performance</strong> : pages rapides et stables malgré une forte densité de contenu</li>
  <li><strong>Évolutivité</strong> : structure adaptée à l’ajout de rubriques et d’actualités</li>
</ul>`,
    url: 'avh',
    technologies: ['Symfony', 'EasyAdmin4', 'React', 'MySql'],
    year: 2024,
    banner: BannerAVH,
    logo: LogoAVH,
  },
  {
    id: 'vidata',
    name: 'Vidata',
    overview: 'Plateforme de vidéos personnalisées pour améliorer acquisition, fidélisation et service client.',
    details: `<h3>Contexte</h3>
<p>Vidata propose une solution qui automatise la création de vidéos personnalisées à grande échelle, à partir de données (CRM, produits, langues, segments) pour renforcer la performance des campagnes marketing et la relation client.</p>

<h3>Objectif</h3>
<p>Permettre de générer rapidement des vidéos 1‑to‑1 et de les activer sur les bons canaux (email, SMS, paid media, retargeting, réseaux sociaux) avec un socle fiable et sécurisé.</p>

<h3>Fonctionnalités clés</h3>
<ul>
  <li><strong>Automation</strong> : génération en masse en quelques secondes</li>
  <li><strong>Flexibilité</strong> : diffusion multi-canale et multi-formats</li>
  <li><strong>Mesure</strong> : suivi de l’impact et collecte de feedback (questionnaires en fin de vidéo)</li>
</ul>

<h3>Écosystème & intégrations</h3>
<ul>
  <li><strong>API sécurisée</strong> pour connecter données (CRM, produits, langues, etc.)</li>
  <li>Activation multi-canale (email, SMS, paid media, retargeting, réseaux sociaux)</li>
  <li>Cas d’usage : acquisition, onboarding & fidélisation, support client</li>
</ul>

<h3>Qualité & contraintes</h3>
<ul>
  <li><strong>Sécurité</strong> : intégration et traitement des données via une API sécurisée</li>
  <li><strong>Scalabilité</strong> : génération de volumes importants sans dégrader la stabilité</li>
  <li><strong>Mesure</strong> : boucles de feedback pour piloter la performance</li>
</ul>`,
    url: 'vidata',
    technologies: ['C#', '.NET', 'Azure', 'Angular'],
    year: 2021,
    banner: BannerVidata,
    logo: LogoVidata,
  },
];
