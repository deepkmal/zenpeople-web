import { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  children,
  subtitle,
  className = '',
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`${alignClass} ${className}`}>
      <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-gray-600 mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
