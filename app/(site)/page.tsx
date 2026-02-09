import Image from 'next/image';
import stakWorkHard from '@pictures/Stak_work_hard.png';
import glowLine from '@pictures/glow_line.png';
import { Button, InfiniteScroller, JsonLd, TechBadge } from '@components';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getHomeJsonLd } from '@/lib/seo/structuredData';
import { PROFILE_HARD_SKILLS } from '@constants';

export const metadata = createPageMetadata({
  title: 'Développeur web fullstack',
  description:
    'Jonathan Turpin — développeur web fullstack. Portfolio : projets, expertise front-end et back-end, performance, SEO et accessibilité.',
  canonical: '/',
});

export default function Home() {
  const structuredData = getHomeJsonLd();

  return (
    <>
      <JsonLd id="jsonld-home" data={structuredData} />

      <section aria-labelledby="home-title" className="container section relative overflow-hidden">
        <div className="flex flex-col items-start gap-2 md:max-w-[60%] md:gap-10">
          <h1 id="home-title" className="leading-tight">
            <span className="block text-xl sm:text-2xl md:text-3xl font-bold">Jonathan Turpin</span>
            <span className="block mt-1 text-lg sm:text-xl md:text-2xl italic font-medium">
              Développeur web fullstack
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight title-font">
            Je conçois et développe des applications solides, pensées pour durer.
          </p>

          <p className="leading-relaxed">
            Développeur fullstack depuis plusieurs années, j&apos;accompagne entreprises et startups dans la conception
            d&apos;applications web et mobiles performantes et maintenables.
          </p>

          <div className="flex flex-row items-center justify-evenly gap-2 sm:gap-8 mx-auto flex-wrap">
            <Button href="/projects/list" variant="accent" className="!min-w-[170px] justify-center">
              Voir les projets
            </Button>
            <Button href="/contact" isOutline variant="primary" className="!min-w-[180px] justify-center">
              Me contacter
            </Button>
          </div>
        </div>

        <div className="w-full flex justify-end md:absolute md:bottom-0 md:right-0 md:-z-10 md:w-[40%] md:min-w-[200px] md:max-w-[520px]">
          <Image
            src={stakWorkHard}
            alt="Portrait de Jonathan Turpin"
            priority
            className="pointer-events-none select-none h-auto w-[75%] max-w-[420px] md:w-full md:max-w-none"
          />
        </div>
      </section>

      <section aria-labelledby="home-stack" className="container section">
        <h2 id="home-stack" className="sr-only">
          Technologies
        </h2>

        <Image src={glowLine} alt="" aria-hidden="true" className="w-[100%] h-[70px] mx-auto mt-[-20px] ml-[-50px]" />

        <InfiniteScroller
          items={PROFILE_HARD_SKILLS}
          getKey={(item) => item.label}
          durationMs={36000}
          gap="1.25rem"
          ariaLabel="Liste des technologies"
          renderItem={(item) => item.isOnMain && <TechBadge label={item.label} icon={item.logo} key={item.label} />}
        />

        <Image src={glowLine} alt="" aria-hidden="true" className="w-[100%] h-[70px] mx-auto" />
      </section>
    </>
  );
}
