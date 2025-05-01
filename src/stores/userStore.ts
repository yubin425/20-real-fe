import { create } from 'zustand';
import { User } from '@/types/User';

interface UserStore {
  user: User | null;
  isApproved: boolean;
  setIsApproved: (isApproved: boolean) =>void;
  setUser: (user: User) => void;
  cleanUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isApproved: false,
  setIsApproved: (isApproved: boolean) => {
    set({
      isApproved
    })
  },
  setUser: (user: User) => {
    set({
      user: user
    })
  },
  cleanUser: () => {
    set({
      user: null,
      isApproved: false
    })
  }
}))
