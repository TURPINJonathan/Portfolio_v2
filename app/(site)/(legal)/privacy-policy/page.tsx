import Image from 'next/image';

import type { ReactNode } from 'react';

import { LEGAL } from '@constants';
import { createPageMetadata } from '@/lib/seo/metadata';
import { Button, GradientText } from '@components';
import { Dot } from '@icons';

export const metadata = createPageMetadata({
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et informations RGPD du site.',
  canonical: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  const fallback = (value: string) => value || 'À renseigner';

  const dotList = (items: ReactNode[]) => (
    <ul className="mt-2">
      {items.map((item, index) => (
        <li key={index} className="flex flex-nowrap items-center gap-2">
          <Image src={Dot} alt="" aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="container section flex flex-col gap-4">
      <header>
        <h1 id="top" className="scroll-mt-24 text-center">
          <GradientText
            as="span"
            colors={['#484080', '#7462a8', '#f8c6fb', '#7462a8', '#484080']}
            animationSpeed={8}
            showBorder={false}
          >
            Politique de confidentialité
          </GradientText>
        </h1>

        <p className="mt-3 text-center text-white/80 leading-relaxed max-w-[85ch] mx-auto">
          La présente politique de confidentialité décrit la manière dont <strong>{LEGAL.publisherName}</strong>
          collecte et traite les données personnelles des utilisateurs du site <strong>{LEGAL.siteName}</strong>.
        </p>
      </header>

      <section className="projectDetailContainer" aria-labelledby="data-controller">
        <h2 id="data-controller" className="scroll-mt-24">
          1) Responsable du traitement{' '}
          <a
            className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
            href="#data-controller"
            aria-label="Lien direct vers la section Responsable du traitement"
          >
            Permalien
          </a>
        </h2>
        <p className="mt-2">
          Le responsable du traitement est : <strong>{fallback(LEGAL.dataControllerName)}</strong>
          <br />
          Contact : <strong>{fallback(LEGAL.dataControllerEmail)}</strong>
        </p>
      </section>

      <section className="projectDetailContainer" aria-labelledby="data-collected">
        <h2 id="data-collected" className="scroll-mt-24">
          2) Données collectées{' '}
          <a
            className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
            href="#data-collected"
            aria-label="Lien direct vers la section Données collectées"
          >
            Permalien
          </a>
        </h2>
        <p className="mt-2">
          Lorsque l’utilisateur utilise le formulaire de contact, les données suivantes peuvent être collectées :
        </p>
        {dotList([
          'Civilité',
          'Nom',
          'Prénom',
          'Entreprise',
          'Poste au sein de l’entreprise',
          'Adresse email',
          'Message',
        ])}
      </section>

      <section className="projectDetailContainer" aria-labelledby="processing-purposes">
        <h2 id="processing-purposes" className="scroll-mt-24">
          3) Finalités du traitement{' '}
          <a
            className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
            href="#processing-purposes"
            aria-label="Lien direct vers la section Finalités du traitement"
          >
            Permalien
          </a>
        </h2>
        <p className="mt-2">Les données collectées ont pour finalité :</p>
        {dotList([
          'répondre aux demandes envoyées via le formulaire de contact ;',
          'assurer le suivi des échanges précontractuels ou professionnels.',
        ])}
      </section>

      <section className="projectDetailContainer" aria-labelledby="legal-basis">
        <h2 id="legal-basis" className="scroll-mt-24">
          4) Base légale{' '}
          <a
            className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
            href="#legal-basis"
            aria-label="Lien direct vers la section Base légale"
          >
            Permalien
          </a>
        </h2>
        <p className="mt-2">Le traitement est fondé sur :</p>
        {dotList([
          <>
            l’intérêt légitime de <strong>{LEGAL.publisherName}</strong> à répondre aux sollicitations reçues.
          </>,
        ])}
      </section>

      <section className="projectDetailContainer" aria-labelledby="recipients">
        <h2 id="recipients" className="scroll-mt-24">
          5) Destinataires{' '}
          <a
            className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
            href="#recipients"
            aria-label="Lien direct vers la section Destinataires"
          >
            Permalien
          </a>
        </h2>
        <p className="mt-2">
          Les données sont destinées exclusivement à <strong>{fallback(LEGAL.dataRecipients)}</strong>.
        </p>
        <p className="mt-2">Elles ne sont ni vendues, ni louées, ni transmises à des tiers.</p>
      </section>

      <section className="projectDetailContainer" aria-labelledby="retention-period">
        <h2 id="retention-period" className="scroll-mt-24">
          6) Durée de conservation{' '}
          <a
            className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
            href="#retention-period"
            aria-label="Lien direct vers la section Durée de conservation"
          >
            Permalien
          </a>
        </h2>
        <p className="mt-2">
          Les données sont conservées pendant une durée maximale de{' '}
          <strong>{fallback(LEGAL.dataRetentionPeriod)}</strong> à compter du dernier échange.
        </p>
      </section>

      <section className="projectDetailContainer" aria-labelledby="security">
        <h2 id="security" className="scroll-mt-24">
          7) Sécurité{' '}
          <a
            className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
            href="#security"
            aria-label="Lien direct vers la section Sécurité"
          >
            Permalien
          </a>
        </h2>
        <p className="mt-2">
          <strong>{LEGAL.publisherName}</strong> met en œuvre des mesures techniques et organisationnelles raisonnables
          pour protéger les données personnelles contre la perte, l’altération, l’accès non autorisé ou la divulgation.
        </p>
      </section>

      <section className="projectDetailContainer" aria-labelledby="user-rights">
        <h2 id="user-rights" className="scroll-mt-24">
          8) Droits des utilisateurs{' '}
          <a
            className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
            href="#user-rights"
            aria-label="Lien direct vers la section Droits des utilisateurs"
          >
            Permalien
          </a>
        </h2>
        <p className="mt-2">Conformément au RGPD, l’utilisateur dispose des droits suivants :</p>
        {dotList([
          'droit d’accès ;',
          'droit de rectification ;',
          'droit d’effacement ;',
          'droit d’opposition ;',
          'droit de limitation.',
        ])}
        <p className="mt-2">
          Ces droits peuvent être exercés par email à : <strong>{fallback(LEGAL.dataControllerEmail)}</strong>.
        </p>
        <p className="mt-2">
          L’utilisateur peut également déposer une réclamation auprès de la{' '}
          <a className="underline" href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            CNIL
          </a>
          .
        </p>
      </section>

      <section className="projectDetailContainer" aria-labelledby="cookies">
        <h2 id="cookies" className="scroll-mt-24">
          9) Cookies{' '}
          <a
            className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
            href="#cookies"
            aria-label="Lien direct vers la section Cookies"
          >
            Permalien
          </a>
        </h2>

        <h3 id="cookies-current-state" className="mt-6 scroll-mt-24">
          9.1 État actuel{' '}
          <a
            className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
            href="#cookies-current-state"
            aria-label="Lien direct vers la sous-section Cookies — État actuel"
          >
            Permalien
          </a>
        </h3>
        <p className="mt-2">
          À ce jour, le Site n’utilise <strong>aucun cookie</strong> à des fins publicitaires.
        </p>

        <h3 id="cookies-future-changes" className="mt-6 scroll-mt-24">
          9.2 Évolution possible{' '}
          <a
            className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
            href="#cookies-future-changes"
            aria-label="Lien direct vers la sous-section Cookies — Évolution possible"
          >
            Permalien
          </a>
        </h3>
        <p className="mt-2">
          Des cookies de mesure d’audience (par exemple Google Analytics) pourront être ajoutés ultérieurement. Le cas
          échéant :
        </p>
        {dotList([
          'un bandeau de consentement sera affiché ;',
          'l’utilisateur pourra accepter ou refuser ces cookies ;',
          'la présente politique sera mise à jour.',
        ])}
      </section>

      <div className="mt-8 flex justify-center lg:mt-[-80px] lg:justify-end">
        <Button
          href="#top"
          variant="default"
          appearance="bare"
          size="md"
          label="Retour en haut de la page"
          ariaLabel="Retour en haut de la page"
        />
      </div>
    </section>
  );
}
