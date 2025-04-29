import Button from '@/components/Button';

type SuggestQuestionItemProps = {
  text: string;
  onClick: (text: string) => void;
}

export default function SuggestQuestionItem({text, onClick}: SuggestQuestionItemProps) {
  return (
    <Button onClick={() => onClick(text)} className="w-80" variant='default'>
      {text}
    </Button>
  )
}
