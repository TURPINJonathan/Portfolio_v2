import { LEGAL } from '@constants';
import { createPageMetadata } from '@/lib/seo/metadata';
import { Button } from '@components';
import { ToTopScreen } from '@icons';

export const metadata = createPageMetadata({
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et informations RGPD du site.',
  canonical: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  const fallback = (value: string) => value || 'À renseigner';

  return (
    <section className="container section">
      <h1 id="top" className="scroll-mt-24">
        Politique de confidentialité
      </h1>

      <p>
        La présente politique de confidentialité décrit la manière dont <strong>{LEGAL.publisherName}</strong> collecte
        et traite les données personnelles des utilisateurs du site <strong>{LEGAL.siteName}</strong>.
      </p>

      <h2 id="data-controller" className="mt-8 scroll-mt-24">
        1) Responsable du traitement{' '}
        <a
          className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
          href="#data-controller"
          aria-label="Lien direct vers la section Responsable du traitement"
        >
          Permalien
        </a>
      </h2>
      <p>
        Le responsable du traitement est : <strong>{fallback(LEGAL.dataControllerName)}</strong>
        <br />
        Contact : <strong>{fallback(LEGAL.dataControllerEmail)}</strong>
      </p>

      <h2 id="data-collected" className="mt-8 scroll-mt-24">
        2) Données collectées{' '}
        <a
          className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
          href="#data-collected"
          aria-label="Lien direct vers la section Données collectées"
        >
          Permalien
        </a>
      </h2>
      <p>Lorsque l’utilisateur utilise le formulaire de contact, les données suivantes peuvent être collectées :</p>
      <ul className="mt-2 list-disc pl-6">
        <li>Civilité</li>
        <li>Nom</li>
        <li>Prénom</li>
        <li>Entreprise</li>
        <li>Poste au sein de l’entreprise</li>
        <li>Adresse email</li>
        <li>Message</li>
      </ul>

      <h2 id="processing-purposes" className="mt-8 scroll-mt-24">
        3) Finalités du traitement{' '}
        <a
          className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
          href="#processing-purposes"
          aria-label="Lien direct vers la section Finalités du traitement"
        >
          Permalien
        </a>
      </h2>
      <p>Les données collectées ont pour finalité :</p>
      <ul className="mt-2 list-disc pl-6">
        <li>répondre aux demandes envoyées via le formulaire de contact ;</li>
        <li>assurer le suivi des échanges précontractuels ou professionnels.</li>
      </ul>

      <h2 id="legal-basis" className="mt-8 scroll-mt-24">
        4) Base légale{' '}
        <a
          className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
          href="#legal-basis"
          aria-label="Lien direct vers la section Base légale"
        >
          Permalien
        </a>
      </h2>
      <p>Le traitement est fondé sur :</p>
      <ul className="mt-2 list-disc pl-6">
        <li>
          l’intérêt légitime de <strong>{LEGAL.publisherName}</strong> à répondre aux sollicitations reçues.
        </li>
      </ul>

      <h2 id="recipients" className="mt-8 scroll-mt-24">
        5) Destinataires{' '}
        <a
          className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
          href="#recipients"
          aria-label="Lien direct vers la section Destinataires"
        >
          Permalien
        </a>
      </h2>
      <p>
        Les données sont destinées exclusivement à <strong>{fallback(LEGAL.dataRecipients)}</strong>.
      </p>
      <p>Elles ne sont ni vendues, ni louées, ni transmises à des tiers.</p>

      <h2 id="retention-period" className="mt-8 scroll-mt-24">
        6) Durée de conservation{' '}
        <a
          className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
          href="#retention-period"
          aria-label="Lien direct vers la section Durée de conservation"
        >
          Permalien
        </a>
      </h2>
      <p>
        Les données sont conservées pendant une durée maximale de <strong>{fallback(LEGAL.dataRetentionPeriod)}</strong>{' '}
        à compter du dernier échange.
      </p>

      <h2 id="security" className="mt-8 scroll-mt-24">
        7) Sécurité{' '}
        <a
          className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
          href="#security"
          aria-label="Lien direct vers la section Sécurité"
        >
          Permalien
        </a>
      </h2>
      <p>
        <strong>{LEGAL.publisherName}</strong> met en œuvre des mesures techniques et organisationnelles raisonnables
        pour protéger les données personnelles contre la perte, l’altération, l’accès non autorisé ou la divulgation.
      </p>

      <h2 id="user-rights" className="mt-8 scroll-mt-24">
        8) Droits des utilisateurs{' '}
        <a
          className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
          href="#user-rights"
          aria-label="Lien direct vers la section Droits des utilisateurs"
        >
          Permalien
        </a>
      </h2>
      <p>Conformément au RGPD, l’utilisateur dispose des droits suivants :</p>
      <ul className="mt-2 list-disc pl-6">
        <li>droit d’accès ;</li>
        <li>droit de rectification ;</li>
        <li>droit d’effacement ;</li>
        <li>droit d’opposition ;</li>
        <li>droit de limitation.</li>
      </ul>
      <p>
        Ces droits peuvent être exercés par email à : <strong>{fallback(LEGAL.dataControllerEmail)}</strong>.
      </p>
      <p>
        L’utilisateur peut également déposer une réclamation auprès de la{' '}
        <a className="underline" href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          CNIL
        </a>
        .
      </p>

      <h2 id="cookies" className="mt-8 scroll-mt-24">
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
      <p>
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
      <p>
        Des cookies de mesure d’audience (par exemple Google Analytics) pourront être ajoutés ultérieurement. Le cas
        échéant :
      </p>
      <ul className="mt-2 list-disc pl-6">
        <li>un bandeau de consentement sera affiché ;</li>
        <li>l’utilisateur pourra accepter ou refuser ces cookies ;</li>
        <li>la présente politique sera mise à jour.</li>
      </ul>

      <div className="mt-8 flex justify-center lg:mt-[-80px] lg:justify-end">
        <Button
          href="#top"
          variant="default"
          appearance="bare"
          picture={ToTopScreen}
          size="md"
          contentSize="h-50 w-50 lg:h-40 lg:w-40"
          label="Retour en haut de la page"
          ariaLabel="Retour en haut de la page"
        />
      </div>
    </section>
  );
}
