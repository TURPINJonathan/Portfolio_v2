'use client';

import { FormEvent, useMemo, useState } from 'react';

import { Button } from '@components';

type Civility = 'madame' | 'monsieur' | 'autre' | 'non_specifiee';

type FieldErrors = Partial<
  Record<
    | 'civility'
    | 'firstName'
    | 'lastName'
    | 'company'
    | 'role'
    | 'email'
    | 'phone'
    | 'message'
    | 'acceptPrivacyPolicy'
    | 'form',
    string
  >
>;

const DEFAULT_CIVILITY: Civility = 'non_specifiee';

interface IContactFormProps {
  className?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactForm({ className }: IContactFormProps) {
  const [civility, setCivility] = useState<Civility>(DEFAULT_CIVILITY);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  function resetForm() {
    setCivility(DEFAULT_CIVILITY);
    setFirstName('');
    setLastName('');
    setCompany('');
    setRole('');
    setEmail('');
    setPhone('');
    setMessage('');
    setAcceptPrivacyPolicy(false);
    setWebsite('');
  }

  const canSubmit = useMemo(() => {
    if (isSubmitting) return false;
    if (civility === DEFAULT_CIVILITY) return false;
    if (!firstName.trim()) return false;
    if (!lastName.trim()) return false;
    if (!email.trim() || !isValidEmail(email.trim())) return false;
    if (!message.trim() || message.trim().length < 10) return false;
    if (!acceptPrivacyPolicy) return false;
    return true;
  }, [acceptPrivacyPolicy, civility, email, firstName, isSubmitting, lastName, message]);

  function validateClient(): FieldErrors {
    const next: FieldErrors = {};

    if (civility === DEFAULT_CIVILITY) next.civility = 'Champ requis.';
    if (!firstName.trim()) next.firstName = 'Champ requis.';
    if (!lastName.trim()) next.lastName = 'Champ requis.';

    const emailTrimmed = email.trim();
    if (!emailTrimmed) next.email = 'Champ requis.';
    else if (!isValidEmail(emailTrimmed)) next.email = 'Email invalide.';

    const messageTrimmed = message.trim();
    if (!messageTrimmed) next.message = 'Champ requis.';
    else if (messageTrimmed.length < 10) next.message = 'Message trop court (10 caractères minimum).';

    if (!acceptPrivacyPolicy) next.acceptPrivacyPolicy = 'Obligatoire.';

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({});
    const nextErrors = validateClient();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          civility,
          firstName,
          lastName,
          company,
          role,
          email,
          phone,
          message,
          acceptPrivacyPolicy,
          website,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          fieldErrors?: Record<string, string>;
          message?: string;
        } | null;

        if (data?.fieldErrors) {
          setErrors({ ...data.fieldErrors, form: 'Certains champs sont invalides.' });
        } else {
          const defaultMessage =
            response.status === 429
              ? 'Trop de tentatives. Merci d’attendre quelques minutes puis de réessayer.'
              : 'Impossible d’envoyer le message. Réessayez plus tard.';
          setErrors({ form: data?.message ?? defaultMessage });
        }
        return;
      }

      resetForm();
      setIsSuccess(true);
    } catch {
      setErrors({ form: 'Erreur réseau. Vérifiez votre connexion et réessayez.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  const containerClassName = className ? `cardContainer ${className}` : 'cardContainer';

  if (isSuccess) {
    return (
      <section className={containerClassName} aria-live="polite">
        <h2 className="title-font text-xl sm:text-2xl font-semibold">Message envoyé</h2>
        <p className="mt-2 leading-relaxed">
          Merci ! Nous vous répondrons dans les plus brefs délais. Si c’est urgent, vous pouvez aussi me contacter via
          LinkedIn.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/" variant="primary" isOutline className="justify-center">
            Retour à l’accueil
          </Button>
          <Button
            variant="accent"
            className="justify-center"
            onClick={() => {
              setIsSuccess(false);
              setErrors({});
              resetForm();
            }}
          >
            Envoyer un autre message
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className={containerClassName} aria-labelledby="contact-form-title">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* title */}
          <div className="flex-1 basis-[150px] min-w-0">
            <label className="block text-sm" htmlFor="civility">
              Appellation
            </label>
            <select
              id="civility"
              name="civility"
              value={civility}
              onChange={(e) => setCivility(e.target.value as Civility)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 pr-10 truncate"
              aria-invalid={Boolean(errors.civility)}
            >
              <option value="non_specifiee">---</option>
              <option value="madame">Madame</option>
              <option value="monsieur">Monsieur</option>
              <option value="autre">Ne souhaite pas préciser</option>
            </select>
            {errors.civility ? <p className="mt-1 text-sm text-red-300">{errors.civility}</p> : null}
          </div>

          {/* lastname */}
          <div className="flex-3 basis-[200px]">
            <label className="block text-sm" htmlFor="lastName">
              Nom *
            </label>
            <input
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2"
              aria-invalid={Boolean(errors.lastName)}
            />
            {errors.lastName ? <p className="mt-1 text-sm text-red-300">{errors.lastName}</p> : null}
          </div>

          {/* firstname */}
          <div className="flex-3 basis-[200px]">
            <label className="block text-sm" htmlFor="firstName">
              Prénom *
            </label>
            <input
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2"
              aria-invalid={Boolean(errors.firstName)}
            />
            {errors.firstName ? <p className="mt-1 text-sm text-red-300">{errors.firstName}</p> : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex-1 basis-[200px]">
            <label className="block text-sm" htmlFor="company">
              Entreprise
            </label>
            <input
              id="company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoComplete="organization"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2"
            />
            {errors.company ? <p className="mt-1 text-sm text-red-300">{errors.company}</p> : null}
          </div>
          <div className="flex-1 basis-[200px]">
            <label className="block text-sm" htmlFor="role">
              Fonction (dans l’entreprise)
            </label>
            <input
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              autoComplete="organization-title"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2"
            />
            {errors.role ? <p className="mt-1 text-sm text-red-300">{errors.role}</p> : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex-1 basis-[200px]">
            <label className="block text-sm" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              inputMode="email"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <p className="mt-1 text-sm text-red-300">{errors.email}</p> : null}
          </div>
          <div className="flex-1 basis-[200px]">
            <label className="block text-sm" htmlFor="phone">
              Téléphone
            </label>
            <input
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2"
            />
            {errors.phone ? <p className="mt-1 text-sm text-red-300">{errors.phone}</p> : null}
          </div>
        </div>

        <div>
          <label className="block text-sm" htmlFor="message">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={7}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 resize-y"
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? <p className="mt-1 text-sm text-red-300">{errors.message}</p> : null}
          <small className="mt-1 text-sm text-white/70 italic">
            Minimum 10 caractères. Évitez les informations sensibles.
          </small>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="acceptPrivacyPolicy"
            name="acceptPrivacyPolicy"
            type="checkbox"
            checked={acceptPrivacyPolicy}
            onChange={(e) => setAcceptPrivacyPolicy(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border border-white/20 bg-black/20"
            aria-invalid={Boolean(errors.acceptPrivacyPolicy)}
          />
          <div>
            <label htmlFor="acceptPrivacyPolicy" className="block">
              J’accepte que mes données soient utilisées afin d&apos;être recontacté, conformément à{' '}
              <a className="underline" href="/privacy-policy">
                la politique de confidentialité
              </a>
              . *
            </label>
            {errors.acceptPrivacyPolicy ? (
              <p className="mt-1 text-sm text-red-300">{errors.acceptPrivacyPolicy}</p>
            ) : null}
          </div>
        </div>

        {errors.form ? <p className="text-sm text-red-300">{errors.form}</p> : null}

        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <Button type="submit" variant="accent" disabled={!canSubmit} className="!min-w-[200px] justify-center">
            {isSubmitting ? 'Envoi…' : 'Envoyer le message'}
          </Button>
          <Button
            type="button"
            variant="primary"
            isOutline
            disabled={isSubmitting}
            onClick={() => {
              resetForm();
              setErrors({});
            }}
            className="!min-w-[200px]"
          >
            Réinitialiser
          </Button>
        </div>
      </form>
      <small className="text-gray-400 italic">Les champs marqués * sont requis.</small>
    </section>
  );
}
