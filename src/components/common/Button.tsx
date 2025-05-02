import React from 'react';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'plain';
type Size = 'default' | 'sm' | 'lg' | 'icon' | 'lg_icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export default function Button({
                                 className = '',
                                 variant = 'default',
                                 size = 'default',
                                 ...props
                               }: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

  const variantClasses: Record<Variant, string> = {
    default: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm',
    secondary: 'bg-secondary-400 hover:bg-secondary-500 text-white shadow-sm',
    destructive: 'bg-error-500 hover:bg-error-600 text-white shadow-sm',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    link: 'text-gray-700 underline-offset-4 underline',
    plain: '',
  };

  const sizeClasses: Record<Size, string> = {
    default: 'h-9 rounded px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9 rounded-full',
    lg_icon: 'h-12 w-12 rounded-full',
  };

  const combinedClassName = [
    baseClasses,
    variant !== 'plain' ? variantClasses[variant] : '',
    variant !== 'plain' ? sizeClasses[size]: '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={combinedClassName} {...props} />
  );
}
