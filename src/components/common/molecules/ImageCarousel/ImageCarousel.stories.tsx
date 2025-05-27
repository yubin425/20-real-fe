import type { Meta, StoryObj } from '@storybook/react';

import { ImageCarousel } from '@/components/common/molecules/ImageCarousel/index';
import { NoticeFile } from '@/types/post/noticeFile';

import '@/app/globals.css';

const mockImages: NoticeFile[] = [
  { id: 1, fileName: '이미지1', fileUrl: 'https://placehold.co/900x300.png', fileType: 'png', fileSeqNo: 1 },
  { id: 2, fileName: '이미지2', fileUrl: 'https://placehold.co/600x200.png', fileType: 'png', fileSeqNo: 1 },
  { id: 3, fileName: '이미지3', fileUrl: 'https://placehold.co/300x100.png', fileType: 'png', fileSeqNo: 1 },
];

const meta: Meta<typeof ImageCarousel> = {
  title: 'Common/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
이미지 슬라이드 캐러셀 컴포넌트입니다.  
- 좌우 버튼 또는 하단 점 네비게이션으로 이미지 전환  
- 이미지를 클릭하면 전체 화면 모달로 확대 표시  
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageCarousel>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-2xl min-h-[400px] h-full p-4">
      <ImageCarousel images={mockImages} />
    </div>
  ),
};
