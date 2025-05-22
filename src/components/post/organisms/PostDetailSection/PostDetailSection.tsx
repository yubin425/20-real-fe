import { NewsDetail } from '@/types/post/newsDetail';
import { NoticeDetail } from '@/types/post/noticeDetail';

interface PostDetailSectionProps {
  post: NewsDetail | NoticeDetail;
}

export function PostDetailSection({ post }: PostDetailSectionProps) {
  return <>{post}</>;
}
