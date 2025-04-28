import { LucideIcon } from 'lucide-react';

export type IconButtonVariant = 'solid' | 'ghost' | 'outline';
export type IconButtonShape = 'circle' | 'rounded';
export type IconButtonSize = 'sm' | 'md' | 'lg';


interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label?: string;
  variant?: IconButtonVariant;
  shape?: IconButtonShape;
  size?: IconButtonSize;
  className?: string;
}

export default function IconButton({
                                     icon: Icon,
                                     label,
                                     variant = 'ghost',
                                     shape = 'circle',
                                     size = 'md',
                                     className = '',
                                     ...props
                                   }: IconButtonProps) {

  const variants: Record<IconButtonVariant, string> = {
    solid: 'bg-primary-500 text-white hover:bg-primary-600',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  const shapes: Record<IconButtonShape, string> = {
    circle: 'rounded-full',
    rounded: 'rounded-md',
  };

  const sizes = {
    sm: { button: 'w-8 h-8', image: 14 },
    md: { button: 'w-10 h-10', image: 18 },
    lg: { button: 'w-12 h-12', image: 22 },
  };

  return (
    <button
      className={`
        flex flex-col items-center justify-center gap-1
        ${variants[variant]}
        ${shapes[shape]}
        ${sizes[size].button}
        ${className}
      `}
      {...props}
    >
      <Icon width={sizes[size].image} height={sizes[size].image} />
      {label && <span className="text-xs">{label}</span>}
    </button>
  );
}
