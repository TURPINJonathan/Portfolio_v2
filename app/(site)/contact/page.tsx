import Image from 'next/image';

import stakSendMail from '@pictures/Stak_send_mail.png';

import { GradientText } from '@components';
import { createPageMetadata } from '@/lib/seo/metadata';

import ContactForm from './ContactForm';

export const metadata = createPageMetadata({
  title: 'Contact',
  description: 'Contactez Jonathan Turpin (email, téléphone, LinkedIn, GitHub).',
  canonical: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <section className="container section flex flex-col gap-6">
        <header className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-center">
            <GradientText
              as="span"
              colors={['#484080', '#7462a8', '#f8c6fb', '#7462a8', '#484080']}
              animationSpeed={8}
              showBorder={false}
            >
              Contactez-moi
            </GradientText>
          </h1>

          <p className="text-center italic max-w-[85ch] flex flex-col">
            <span>Un besoin, une opportunité, une question ?</span>
            <span>N&apos;hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.</span>
          </p>
        </header>

        <div className="flex flex-col gap-4 lg:flex-row">
          <ContactForm className="order-1 lg:order-2 flex-2 basis-[370px]" />

          <aside className="order-2 lg:order-1 flex-1 flex flex-col justify-between items-start gap-4 basis-[340px]">
            <section className="flex flex-col gap-4" aria-labelledby="contact-quick-title">
              <h2 id="contact-quick-title" className="title-font text-xl sm:text-2xl font-semibold">
                Pourquoi me contacter ?
              </h2>

              <ul className="list-disc space-y-1 pl-5 leading-relaxed text-sm">
                <li>réponse sous 24-48h</li>
                <li>habitué aux contextes produit / équipe</li>
                <li>missions courtes ou longues</li>
                <li>communication transparente, claire, sans jargon inutile</li>
              </ul>

              <p className="italic leading-relaxed text-sm">Je réponds personnellement à chaque message</p>
            </section>

            <div className="w-full flex justify-center">
              <Image
                src={stakSendMail}
                alt="Illustration d’un envoi de message"
                className="pointer-events-none select-none h-auto w-[78%] max-w-[420px]"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
