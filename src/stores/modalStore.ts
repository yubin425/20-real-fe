import { create } from 'zustand';
import { ReactNode } from 'react';

interface ModalState {
  isOpen: boolean;
  title: string;
  content: ReactNode;
  openModal: (title: string, content: ReactNode) => void;
  closeModal: () => void;
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  title: '',
  content: null,
  openModal: (title, content) => set({ isOpen: true, title, content }),
  closeModal: () => set({ isOpen: false, title: '', content: null }),
}));
