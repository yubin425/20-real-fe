import { NoticeDetailPage } from '@/components/post/pages/NoticeDetailPage';

interface PageParams {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageParams) {
  return <NoticeDetailPage params={params} />;
}
