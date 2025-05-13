'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useState } from 'react';

import Button from '@/components/common/Button';
import SafeImage from '@/components/common/SafeImage';
import { NoticeFile } from '@/types/post/noticeFile';

interface ImageCarouselProps {
  images: NoticeFile[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [modalImage, setModalImage] = useState<NoticeFile | null>(null);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  return (
    <div>
      {/* 이미지 */}
      <div className="rounded-xl overflow-hidden mb-3 shadow-sm relative w-full h-48">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <SafeImage
              src={image.fileUrl}
              alt={image.fileName}
              className="w-full h-full object-cover object-center cursor-pointer"
              width={400}
              height={200}
              onClick={() => setModalImage(image)}
            />
          </div>
        ))}

        {current > 0 && (
          <Button
            variant="plain"
            size="icon"
            className="flex justify-center items-center absolute left-2 top-2/5 rounded-full bg-white w-9 h-9 opacity-80"
            onClick={() => setCurrent(current - 1)}
          >
            <ChevronLeft />
          </Button>
        )}

        {current < images.length - 1 && (
          <Button
            variant="plain"
            size="icon"
            className="flex justify-center items-center absolute right-2 top-2/5 rounded-full bg-white w-9 h-9 opacity-80"
            onClick={() => setCurrent(current + 1)}
          >
            <ChevronRight />
          </Button>
        )}
      </div>

      {/* 네비게이션 점 */}
      <div className="flex justify-center mb-4">
        <div className="flex space-x-1">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => goTo(index)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${
                index === current ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 모달 이미지 */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-full max-w-3xl p-4">
            <SafeImage
              src={modalImage.fileUrl}
              alt={modalImage.fileName}
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
