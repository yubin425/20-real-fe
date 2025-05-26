interface WikiEditPageProps {
  title: string;
}

export function WikiEditPage(props: WikiEditPageProps) {
  const title = decodeURIComponent(props.title);
  return <>{title}</>;
}
