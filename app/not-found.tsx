import StakError from '@pictures/Stak_error.png';
import Image from 'next/image';
import { Button } from '@components';
import styles from '@styles/not-found.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Jonathan TURPIN | 404 — Page non trouvée',
  },
  description: "La page demandée n'existe pas (erreur 404). Retour à l'accueil.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section
      className="container section flex flex-col items-center justify-center gap-2 text-center"
      aria-labelledby="not-found-title"
    >
      <h1 id="not-found-title">Page non trouvée</h1>

      <p>
        <span className="sr-only">Erreur 404.&nbsp;</span>
        Stak s&apos;est perdu dans l&apos;espace.
      </p>

      <div className={`${styles['robot-wrapper']} relative`}>
        <Image
          src={StakError}
          alt=""
          aria-hidden="true"
          className="w-lg h-auto"
          placeholder="blur"
          sizes="(max-width: 768px) 50vw, 600px"
        />
      </div>

      <Button href="/" label="Retour à l'accueil" variant="accent" size="lg" />
    </section>
  );
}
