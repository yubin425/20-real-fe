import Link from 'next/link';

interface WikiDetailPageProps {
  title: string;
}

export function WikiDetailPage({ title }: WikiDetailPageProps) {
  return (
    <>
      <div>{decodeURIComponent(title)} 위키 문서</div>
      <Link href={`/wiki/${title}/edit`}>문서 편집</Link>
    </>
  );
}
