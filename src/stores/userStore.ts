import { create } from 'zustand';
import { User } from '@/types/user/user';

interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
  isApproved: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsApproved: (isApproved: boolean) =>void;
  setUser: (user: User) => void;
  cleanUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  isApproved: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {
    set({
      isLoggedIn
    })
  },
  setIsApproved: (isApproved: boolean) => {
    set({
      isApproved
    })
  },
  setUser: (user: User) => {
    set({
      user: user,
      isLoggedIn: true,
    })
  },
  cleanUser: () => {
    set({
      user: null,
      isLoggedIn: false,
      isApproved: false
    })
  }
}))
