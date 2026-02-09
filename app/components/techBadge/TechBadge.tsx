import Image from 'next/image';
import type { StaticImageData } from 'next/image';

export interface TechBadgeProps {
  icon: string | StaticImageData;
  label?: string;
}

export default function TechBadge({ icon, label }: TechBadgeProps) {
  const isDecorative = Boolean(label);

  return (
    <div className="inline-flex min-w-[100px] flex-col items-center gap-2">
      <Image
        src={icon}
        alt={isDecorative ? '' : `Logo de la technologie ${label ?? ''}`.trim()}
        aria-hidden={isDecorative}
        className="h-15 w-15 object-contain"
      />
      {label ? <small>{label}</small> : null}
    </div>
  );
}
