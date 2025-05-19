import { NewsDetailPage } from '@/components/post/pages/NewsDetailPage/NewsDetailPage';

interface PageParams {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageParams) {
  return <NewsDetailPage params={params} />;
}
