import { createPageMetadata } from '@/lib/seo/metadata';
import { LEGAL } from '@constants';
import { Button, DotList, GradientText } from '@components';
import { ToTopScreen } from '@icons';

export const metadata = createPageMetadata({
  title: 'Mentions légales',
  description: 'Mentions légales du site portfolio de Jonathan Turpin.',
  canonical: '/legal-notices',
});

export default function LegalNoticePage() {
  const fallback = (value: string) => value || 'À renseigner';

  return (
    <>
      <section className="container section flex flex-col gap-4">
        <header>
          <h1 id="top" className="scroll-mt-24 text-center">
            <GradientText
              as="span"
              colors={['#484080', '#7462a8', '#f8c6fb', '#7462a8', '#484080']}
              animationSpeed={8}
              showBorder={false}
            >
              Mentions légales
            </GradientText>
          </h1>

          <p className="mt-3 text-center text-white/80 leading-relaxed max-w-[85ch] mx-auto">
            Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’Économie
            Numérique (LCEN), il est précisé aux utilisateurs du site <strong>{LEGAL.siteName}</strong> l’identité des
            différents intervenants dans le cadre de sa réalisation et de son suivi.
          </p>
        </header>

        <section className="projectDetailContainer" aria-labelledby="site-publisher">
          <h2 id="site-publisher" className="scroll-mt-24">
            1) Éditeur du site{' '}
            <a
              className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
              href="#site-publisher"
              aria-label="Lien direct vers la section Éditeur du site"
            >
              Permalien
            </a>
          </h2>

          <p className="mt-2">
            Le présent site, accessible à l’URL{' '}
            <a className="underline" href={LEGAL.siteUrl} rel="noopener noreferrer" target="_blank">
              <strong>{LEGAL.siteUrl}</strong>
            </a>{' '}
            (le « Site »), est édité par :
          </p>

          <p className="mt-2">
            <strong>{LEGAL.publisherName}</strong>, entrepreneur individuel (auto-entrepreneur), domicilié(e) au{' '}
            <strong>{fallback(LEGAL.publisherAddress)}</strong>.
          </p>

          <DotList
            className="mt-2"
            items={[
              <>Email : {fallback(LEGAL.publisherEmail)}</>,
              <>Téléphone : {fallback(LEGAL.publisherPhone)}</>,
              <strong key="siret">SIRET : {fallback(LEGAL.publisherSiret)}</strong>,
            ]}
          />
        </section>

        <section className="projectDetailContainer" aria-labelledby="publication-director">
          <h2 id="publication-director" className="scroll-mt-24">
            2) Directeur de la publication{' '}
            <a
              className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
              href="#publication-director"
              aria-label="Lien direct vers la section Directeur de la publication"
            >
              Permalien
            </a>
          </h2>
          <p className="mt-2">
            Le Directeur de la publication est : <strong>{LEGAL.publicationDirectorName}</strong>.
          </p>
        </section>

        <section className="projectDetailContainer" aria-labelledby="hosting">
          <h2 id="hosting" className="scroll-mt-24">
            3) Hébergement{' '}
            <a
              className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
              href="#hosting"
              aria-label="Lien direct vers la section Hébergement"
            >
              Permalien
            </a>
          </h2>

          <p className="mt-2">Le Site est hébergé par :</p>
          <p className="mt-2">
            <strong>{fallback(LEGAL.hostName)}</strong>
            <br />
            {fallback(LEGAL.hostAddress)}
            {LEGAL.hostPhone && (
              <>
                <br />
                {fallback(LEGAL.hostPhone)}
              </>
            )}

            {LEGAL.hostWebsite && (
              <>
                <br />
                <a href={LEGAL.hostWebsite} target="_blank" rel="noopener noreferrer">
                  {fallback(LEGAL.hostWebsite)}
                </a>
              </>
            )}
          </p>
        </section>

        <section className="projectDetailContainer" aria-labelledby="design-development">
          <h2 id="design-development" className="scroll-mt-24">
            4) Conception / Développement{' '}
            <a
              className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
              href="#design-development"
              aria-label="Lien direct vers la section Conception / Développement"
            >
              Permalien
            </a>
          </h2>
          <p className="mt-2">
            Le Site a été conçu et développé par : <strong>{LEGAL.developerName}</strong>.
          </p>
        </section>

        <section className="projectDetailContainer" aria-labelledby="intellectual-property">
          <h2 id="intellectual-property" className="scroll-mt-24">
            5) Propriété intellectuelle{' '}
            <a
              className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
              href="#intellectual-property"
              aria-label="Lien direct vers la section Propriété intellectuelle"
            >
              Permalien
            </a>
          </h2>
          <p className="mt-2">
            L’ensemble du contenu présent sur le Site (textes, images, graphismes, logo, projets, code, etc.) est
            protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de{' '}
            <strong>{LEGAL.ipOwnerName}</strong>, sauf mentions contraires.
          </p>
          <p className="mt-2">
            Toute reproduction, représentation, modification ou adaptation, totale ou partielle, est interdite sans
            autorisation écrite préalable.
          </p>
        </section>

        <section className="projectDetailContainer" aria-labelledby="personal-data">
          <h2 id="personal-data" className="scroll-mt-24">
            6) Données personnelles{' '}
            <a
              className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
              href="#personal-data"
              aria-label="Lien direct vers la section Données personnelles"
            >
              Permalien
            </a>
          </h2>
          <p className="mt-2">
            Le Site peut collecter des données personnelles via son formulaire de contact (civilité, nom, prénom,
            entreprise, poste, email, message).
          </p>
          <p className="mt-2">
            Pour plus d’informations, l’utilisateur est invité à consulter la page{' '}
            <a href="/privacy-policy" className="underline">
              Politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section className="projectDetailContainer" aria-labelledby="cookies">
          <h2 id="cookies" className="scroll-mt-24">
            7) Cookies{' '}
            <a
              className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
              href="#cookies"
              aria-label="Lien direct vers la section Cookies"
            >
              Permalien
            </a>
          </h2>
          <p className="mt-2">Le Site n’utilise pas de cookies à des fins publicitaires.</p>
          <p className="mt-2">
            Des cookies de mesure d’audience pourront être ajoutés ultérieurement. Le cas échéant, un bandeau de
            consentement permettra à l’utilisateur d’accepter ou refuser ces cookies.
          </p>
        </section>

        <section className="projectDetailContainer" aria-labelledby="contact">
          <h2 id="contact" className="scroll-mt-24">
            8) Contact{' '}
            <a
              className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
              href="#contact"
              aria-label="Lien direct vers la section Contact"
            >
              Permalien
            </a>
          </h2>
          <p className="mt-2">
            Pour toute question, l’utilisateur peut contacter l’éditeur à l’adresse :{' '}
            <strong>{fallback(LEGAL.publisherEmail)}</strong>.
          </p>
        </section>

        <section className="projectDetailContainer" aria-labelledby="governing-law">
          <h2 id="governing-law" className="scroll-mt-24">
            9) Droit applicable{' '}
            <a
              className="sr-only underline focus:not-sr-only focus-visible:not-sr-only"
              href="#governing-law"
              aria-label="Lien direct vers la section Droit applicable"
            >
              Permalien
            </a>
          </h2>
          <p className="mt-2">
            Le présent Site et ses mentions légales sont soumis au droit français.
            <br />
            En cas de litige et à défaut de résolution amiable, les tribunaux compétents seront ceux du ressort de{' '}
            <strong>{fallback(LEGAL.jurisdictionCity)}</strong>.
          </p>
        </section>

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
    </>
  );
}
