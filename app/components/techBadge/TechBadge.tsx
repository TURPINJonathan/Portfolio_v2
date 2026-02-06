import Image from 'next/image';

export interface TechBadgeProps {
  icon: string;
  label?: string;
}

export default function TechBadge({ icon, label }: TechBadgeProps) {
  return (
    <div className="inline-flex min-w-[100px] flex-col items-center gap-2">
      <Image
        src={icon}
        alt={`Logo de la technologie ${label}`}
        aria-hidden="true"
        className="h-15 w-15 object-contain"
      />
      {label ? <small>{label}</small> : null}
    </div>
  );
}
