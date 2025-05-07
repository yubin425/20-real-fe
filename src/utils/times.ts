import { differenceInMinutes, differenceInHours, differenceInDays, format, parse } from 'date-fns';

export function formatTime(raw: string): string {
  const date = parse(raw, 'yyyy.MM.dd HH:mm:ss', new Date());
  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);

  if (minutes < 1) return '방금';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  return format(date, 'yyyy.MM.dd');
}

export function isRecent(createdAt: string): boolean {
  return differenceInHours(new Date(), parse(createdAt, 'yyyy.MM.dd HH:mm:ss', new Date())) < 24;
}
