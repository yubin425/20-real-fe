import { WikiEditor } from '@/components/wiki/organisms/WikiEditor';

interface WikiEditPageProps {
  title: string;
}

export function WikiEditPage(props: WikiEditPageProps) {
  const title = decodeURIComponent(props.title);
  return (
    <div>
      <h2 className="text-2xl font-bold mx-4 mt-8 mb-3">{title}</h2>
      <hr className="text-neutral-300" />
      <WikiEditor title={title} />
    </div>
  );
}
