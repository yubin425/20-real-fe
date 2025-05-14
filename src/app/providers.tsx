'use client';

import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Modal from '@/components/common/Modal';
import { queryClient } from '@/queries/base/queryClient';
import { useModal } from '@/stores/modalStore';

export default function Providers({ children }: { children: ReactNode }) {
  const { isOpen, title, content, actions, closeModal } = useModal();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <Modal isOpen={isOpen} title={title} actions={actions} onClose={closeModal}>
        {content}
      </Modal>
    </QueryClientProvider>
  );
}
