'use client';

import { useState } from 'react';

import { SafeImage } from '@/components/atoms/SafeImage';

interface SingleImageProps {
  imageUrl: string;
}

export default function SingleImage({ imageUrl }: SingleImageProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <div>
      {/* 이미지 */}
      <div className="rounded-xl overflow-hidden mb-3 shadow-sm relative w-full h-48">
        <SafeImage
          src={imageUrl}
          alt={imageUrl}
          className="w-full h-full object-cover object-center cursor-pointer"
          width={400}
          height={200}
          onClick={() => setModalImage(imageUrl)}
        />
      </div>

      {/* 모달 이미지 */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-full max-w-3xl p-4">
            <SafeImage
              src={modalImage}
              alt={modalImage}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
