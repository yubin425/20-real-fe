import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'warning' | 'error' | 'ghost';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  rounded?: ButtonRounded;
  className?: string;
}

export default function Button({
                                 children,
                                 variant = 'primary',
                                 size = 'md',
                                 disabled = false,
                                 fullWidth = false,
                                 rounded = 'md',
                                 className = '',
                                 type = 'button',
                                 onClick,
                                 ...props
                               }: ButtonProps) {
  // 버튼 스타일 변형
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm',
    secondary: 'bg-secondary-400 hover:bg-secondary-500 text-white shadow-sm',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700',
    warning: 'bg-warning-500 hover:bg-warning-600 text-white shadow-sm',
    error: 'bg-error-500 hover:bg-error-600 text-white shadow-sm',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  };

  // 버튼 크기
  const sizes: Record<ButtonSize, string> = {
    xs: 'py-1 px-2 text-xs',
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-2.5 px-5 text-lg',
    xl: 'py-3 px-6 text-xl',
  };

  // 둥근 모서리 옵션
  const roundedOptions: Record<ButtonRounded, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${roundedOptions[rounded]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-300
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
