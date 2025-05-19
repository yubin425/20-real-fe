import { PostTypes } from '@/types/post/postType';

export interface Headline {
  id: number;
  title: string;
  type: PostTypes;
}
