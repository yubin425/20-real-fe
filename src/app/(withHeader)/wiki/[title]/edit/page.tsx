import { WikiEditPage } from '@/components/wiki/pages/WikiEditPage';

interface PageParams {
  params: Promise<{ title: string }>;
}

export default async function Page({ params }: PageParams) {
  const { title } = await params;

  return <WikiEditPage title={title} />;
}
