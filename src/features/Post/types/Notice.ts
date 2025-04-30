import { PostPlatform } from '@/features/Post/types/PostPlatform';

export interface Notice {
  id: number;
  title: string;
  author: string;
  platform: PostPlatform;
  userRead: boolean;
  createdAt: string;
}
