'use client';

import Image, { ImageProps, StaticImageData } from 'next/image';

import { useState } from 'react';

interface SafeImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackSrc?: string | StaticImageData;
}

export default function SafeImage({ src, alt, width, height, className = '', fallbackSrc, ...props }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const safeAlt = alt || 'Image';

  if (hasError) {
    if (fallbackSrc) {
      // error 발생 && fallbackSrc가 있는 경우
      return <Image {...props} src={fallbackSrc} alt={safeAlt} width={width} height={height} className={className} />;
    }

    // fallbackSrc 없으면 Placeholder
    return (
      <div
        style={{ width, height }}
        className={`bg-gray-200 flex items-center justify-center text-gray-500 text-xs ${className}`}
      ></div>
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={safeAlt}
      width={width}
      height={height}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
