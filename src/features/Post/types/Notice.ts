export type Notice = {
  id: number;
  title: string;
  author: string;
  platform: '디스코드' | '노션';
  userRead: boolean;
  createdAt: string;
}
