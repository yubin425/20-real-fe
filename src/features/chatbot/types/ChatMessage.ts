export type ChatMessage = {
  id: string;
  text: string;
  type: 'question' | 'answer';
};
