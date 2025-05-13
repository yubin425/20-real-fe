import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/common/Button';
import ToastContainer from '@/components/common/ToastContainer';
import { useToastStore } from '@/stores/toastStore';

import '@/app/globals.css';

const meta: Meta<typeof ToastContainer> = {
  title: 'Common/Toast',
  component: ToastContainer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

const ToastDemo = () => {
  const { showToast } = useToastStore();

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[300px]">
      <Button onClick={() => showToast('Default 토스트')}>Default Toast 띄우기</Button>
      <Button onClick={() => showToast('success 토스트!', 'success')}>Success Toast 띄우기</Button>
      <Button onClick={() => showToast('error 토스트', 'error')}>Error Toast 띄우기</Button>
      <Button onClick={() => showToast('warning 토스트', 'warning')}>Warning Toast 띄우기</Button>
      <Button onClick={() => showToast('Top Positioned 토스트', 'success', 'top')}>Top Toast 띄우기</Button>

      <ToastContainer />
    </div>
  );
};

export const Default: Story = {
  render: () => <ToastDemo />,
};
