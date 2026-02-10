import { CONTACT_LINKS } from '@constants';
import { Button, DotList, GradientText } from '@components';
import { createPageMetadata } from '@/lib/seo/metadata';
import { FiMail } from 'react-icons/fi';

export const metadata = createPageMetadata({
  title: 'À propos',
  description: 'Parcours et approche de Jonathan Turpin, développeur web fullstack.',
  canonical: '/about-me',
});

export default function AboutMePage() {
  const emailAddress = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contact@jonathan-turpin.fr';

  const linkedInLink = CONTACT_LINKS.find((link) => link.key === 'linkedin');
  const maltLink = CONTACT_LINKS.find((link) => link.key === 'malt');

  return (
    <>
      <section className="container section">
        <header className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-center">
            <GradientText
              as="span"
              colors={['#484080', '#7462a8', '#f8c6fb', '#7462a8', '#484080']}
              animationSpeed={8}
              showBorder={false}
            >
              À propos
            </GradientText>
          </h1>

          <p className="text-center italic max-w-[85ch]">
            Je suis développeur full-stack confirmé, et j’aime construire des applications complètes, du serveur jusqu’à
            l’interface.
          </p>
        </header>

        <section className="flex flex-wrap gap-4 mt-4">
          <article className="cardContainer flex flex-col gap-2" aria-labelledby="about">
            <h2 id="about">Qui suis-je ?</h2>
            <p>
              Je suis Jonathan Turpin, développeur fullstack confirmé. Selon le besoin, je peux intervenir sur
              l’ensemble d’un projet ou me concentrer uniquement sur la partie front ou back. Je m’adapte facilement à
              l’existant, que ce soit en autonomie ou au sein d’une équipe, avec toujours la même idée : construire des
              solutions propres, solides et faciles à faire évoluer.
            </p>
          </article>

          <div className="flex flex-wrap gap-4">
            <article className="cardContainer flex-1 basis-[500px] flex flex-col gap-2" aria-labelledby="expertise">
              <h2 id="expertise">Mon expertise</h2>

              <p>Ma stack principale s’articule autour de :</p>
              <DotList
                items={[
                  <>
                    <strong>Backend :</strong> Symfony, PHP, .NET / C#, MySQL
                  </>,
                  <>
                    <strong>Frontend :</strong> React, Vue.js, Angular
                  </>,
                  <>
                    <strong>Mobile :</strong> React Native, Expo
                  </>,
                  <>
                    <strong>Outils & écosystème :</strong> Vite, Pinia, Azure, CI/CD
                  </>,
                  <>
                    <strong>Organisation :</strong> Agile, Scrum, Kanban
                  </>,
                  <>
                    <strong>Testing :</strong> PHPUnit, Jest/Vitest, Cypress/Playwright
                  </>,
                  <>
                    <strong>Architecture :</strong> DDD (léger), Clean Architecture, API REST, monolithe modulaire ou
                    microservices
                  </>,
                  <>
                    <strong>DevOps :</strong> CI/CD (GitHub Actions/Azure DevOps), environnements & déploiements
                  </>,
                  <>
                    <strong>Qualité :</strong> TypeScript, ESLint/Prettier, conventions, revues de code
                  </>,
                  <>
                    <strong>SEO & accessibilité :</strong> metadata, structured data (JSON-LD), a11y, sémantique HTML
                  </>,
                  <>
                    <strong>Observabilité :</strong> logs, monitoring, alerting, Sentry / APM
                  </>,
                  <>
                    <strong>Sécurité :</strong> auth (JWT/OAuth), gestion des secrets
                  </>,
                ]}
              />
              <p>
                Cette polyvalence me permet de travailler sur des produits complets, de comprendre les enjeux techniques
                globaux et de m’adapter facilement à des environnements existants.
              </p>
            </article>

            <article className="cardContainer flex-1 basis-[500px] flex flex-col gap-2" aria-labelledby="work-method">
              <h2 id="work-method">Ma façon de travailler</h2>
              <p>J’aborde les projets avec une approche pragmatique, orientée solution et livraison :</p>
              <DotList
                items={[
                  'compréhension du besoin métier avant les choix techniques',
                  'solutions pragmatiques, adaptées au contexte du projet',
                  'code clair, structuré et maintenable',
                  'qualité de livraison : tests, documentation et CI/CD quand c’est pertinent',
                  'attention portée aux performances et à la stabilité',
                  'priorisation de la valeur livrée pour l’utilisateur final',
                  'communication transparente sur l’avancement, les risques et les arbitrages',
                  'collaboration efficace (code review, pair programming) et autonomie quand nécessaire',
                ]}
              />
              <p>
                Si votre stack n’est pas (encore) dans cette liste, je peux m’y intégrer rapidement : montée en
                compétence structurée, compréhension de l’existant et alignement sur vos standards (conventions,
                qualité, CI/CD, ...).
              </p>
              <p>
                Je suis à l’aise aussi bien en équipe qu’en autonomie, sur des projets internes comme orientés client.
              </p>
            </article>
          </div>

          <article className="cardContainer flex-1 flex flex-col gap-2" aria-labelledby="contact">
            <h2 id="contact">Contact</h2>
            <p>
              Si vous souhaitez échanger autour d’un poste, d’une mission ou d’un projet, vous pouvez me contacter à
              :&nbsp;
              <a className="underline" href={`mailto:${emailAddress}`}>
                {emailAddress}
              </a>
            </p>

            <p className="flex items-center">
              Je suis également disponible sur&nbsp;
              <Button
                href={linkedInLink?.href}
                variant="primary"
                isOutline
                size="xs"
                disabled={!linkedInLink?.href}
                ariaLabel={`${linkedInLink?.label}${linkedInLink?.href ? '' : ' (non configuré)'}`}
                external={linkedInLink?.isExternal}
              >
                {linkedInLink && (
                  <linkedInLink.Icon aria-hidden={true} focusable={false} className={`h-4 w-4 origin-center`} />
                )}
                <span className="ml-1">{linkedInLink?.label}</span>
              </Button>
              ,&nbsp;
              <Button
                href={maltLink?.href}
                variant="primary"
                isOutline
                size="xs"
                disabled={!maltLink?.href}
                ariaLabel={`${maltLink?.label}${maltLink?.href ? '' : ' (non configuré)'}`}
                external={maltLink?.isExternal}
              >
                {maltLink && (
                  <maltLink.Icon aria-hidden={true} focusable={false} className={`h-4 w-4 origin-center scale-150`} />
                )}
                <span className="ml-1">{maltLink?.label}</span>
              </Button>
              , ou le formulaire de&nbsp;
              <Button
                href="/contact"
                variant="primary"
                isOutline
                size="xs"
                disabled={false}
                ariaLabel="Formulaire de contact"
                external={false}
              >
                <FiMail aria-hidden={true} focusable={false} className="h-4 w-4 origin-center" />
                <span className="ml-1">contact</span>
              </Button>
              .
            </p>
          </article>
        </section>

        {/* <h2 className="mt-8">Ce que je privilégie</h2>
      <ul className="mt-3 list-disc pl-5">
        <li>Sémantique HTML et accessibilité (a11y) dès le départ</li>
        <li>Performance (Core Web Vitals), qualité front et back</li>
        <li>SEO technique propre (metadata, canonical, robots/sitemap)</li>
        <li>DX et maintenabilité (TypeScript, composants réutilisables)</li>
      </ul> */}
      </section>
    </>
  );
}
