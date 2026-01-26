# Button

Composant CTA réutilisable : peut être un bouton (action) ou un lien interne/externe.

## Import

Depuis l’index composants :

```ts
import { Button } from '@components/index';
```

Types utiles :

```ts
import type { ButtonSize, ButtonVariant } from '@components/index';
```

## Props

- `label?: string` : texte du bouton (optionnel si `children` est fourni)
- `children?: ReactNode` : contenu custom (ex: icône + texte)
- `variant?: 'accent' | 'primary' | 'secondary' | 'success' | 'danger' | 'warn' | 'default'` : thème couleur
- `appearance?: 'default' | 'bare' | 'ghost'` : rendu
  - `bare` = sans bordure/fond (idéal logo)
  - `ghost` = intérieur transparent + bordure dégradée (look “navbar”)
- `isOutline?: boolean` : style outline (bordure dégradée)
- `size?: 'xs' | 'sm' | 'md' | 'lg'` : taille (impacte aussi la hauteur)
- `href?: string` : si présent, rend un lien
  - interne (Next `<Link>`) si `href` est relatif (`/projects`)
  - externe (`<a target="_blank">`) si `href` commence par `http(s)://` ou `//` (ou si `external` est `true`)
- `external?: boolean` : force le mode lien externe
- `target?: string` / `rel?: string` : attributs du lien externe (par défaut `target="_blank"` + `rel="noreferrer noopener"`)
- `onClick?: (event) => void` : handler de clic (bouton ou lien)
- `type?: 'button' | 'submit' | 'reset'` : type du `<button>` (défaut: `button`)
- `disabled?: boolean` : désactive l’interaction (empêche aussi la navigation)
- `className?: string` : classes additionnelles
- `ariaLabel?: string` : accessibilité (utile si `children` sans texte)

## Notes

- Pour un **bouton d’action**, ne mets pas `href`.
- Pour un **lien**, mets `href` (interne ou externe).
- En `variant="success"` / `variant="warn"`, le texte passe en sombre **uniquement** en mode filled (pas en outline) pour garder le contraste.

## Exemples

### CTA interne (Next Link)

```tsx
<Button label="Voir mes projets" href="/projects/list" variant="accent" />
```

### CTA externe

```tsx
<Button label="Ouvrir GitHub" href="https://github.com" variant="accent" />
```

### Bouton d’action

```tsx
<Button label="Envoyer" variant="primary" onClick={() => console.log('submit')} />
```

### Outline + couleurs

```tsx
<Button label="Succès" variant="success" isOutline />
<Button label="Warning" variant="warn" isOutline />
<Button label="Danger" variant="danger" isOutline />
```

### Tailles

```tsx
<Button label="XS" size="xs" variant="accent" />
<Button label="SM" size="sm" variant="accent" />
<Button label="MD" size="md" variant="accent" />
<Button label="LG" size="lg" variant="accent" />
```

### Bouton logo (sans bordure)

```tsx
import StakLogo from '@pictures/Stak_logo.png';

<Button
  ariaLabel="Accueil"
  appearance="bare"
  variant="default"
  size="xs"
  picture={StakLogo}
  contentSize="h-6 w-6"
  onClick={() => router.push('/')}
/>;
```

### Bouton transparent (ghost)

```tsx
<Button label="À propos" variant="accent" appearance="ghost" onClick={() => router.push('/about-me')} />
```

### Disabled (bouton ou lien)

```tsx
<Button label="Indisponible" variant="secondary" disabled />
<Button label="Lien désactivé" href="/projects/list" variant="secondary" disabled />
```

### Code avec toutes les variances

Exemple “showcase” (à mettre dans un composant client) :

```tsx
'use client';

import { Button } from '@components/index';
import type { ButtonAppearance, ButtonSize, ButtonVariant } from '@components/index';
import StakLogo from '@pictures/Stak_logo.png';
import { useRouter } from 'next/navigation';

export function ButtonShowcase() {
  const router = useRouter();

  const variants: ButtonVariant[] = ['accent', 'primary', 'secondary', 'success', 'danger', 'warn', 'default'];
  const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg'];
  const appearances: ButtonAppearance[] = ['default', 'ghost'];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold">Liens & actions</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <Button label="Internal link" href="/projects/list" variant="accent" />
          <Button label="External link" href="https://example.com" variant="accent" />
          <Button label="Action (router.push)" variant="accent" onClick={() => router.push('/projects/list')} />
          <Button label="Disabled" variant="accent" disabled />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold">Tailles</h3>
        <div className="flex flex-wrap gap-3 items-center">
          {sizes.map((size) => (
            <Button key={size} label={size} variant="accent" size={size} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold">Filled</h3>
        <div className="flex flex-wrap gap-3 items-center">
          {variants.map((variant) => (
            <Button key={`filled-${variant}`} label={variant} variant={variant} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold">Outline</h3>
        <div className="flex flex-wrap gap-3 items-center">
          {variants.map((variant) => (
            <Button key={`outline-${variant}`} label={variant} variant={variant} isOutline />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold">Appearances</h3>
        <div className="flex flex-wrap gap-3 items-center">
          {appearances.map((appearance) => (
            <Button key={appearance} label={appearance} variant="accent" appearance={appearance} />
          ))}
          <Button
            ariaLabel="Accueil"
            appearance="bare"
            variant="default"
            size="xs"
            picture={StakLogo}
            contentSize="h-6 w-6"
            onClick={() => router.push('/')}
          />
        </div>
      </div>
    </section>
  );
}
```
