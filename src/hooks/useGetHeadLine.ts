import { useNewsListQuery } from '@/queries/news/useNewsListQuery';
import { useNoticeListInfinityQuery } from '@/queries/post/useNoticeListInfinityQuery';
import { Headline } from '@/types/common/headline';

export const useHeadlineData = () => {
  const { data: news, isLoading: isLoadingNews } = useNewsListQuery('latest', 2);
  const { data: notices, isLoading: isLoadingNotices } = useNoticeListInfinityQuery(2);

  const isLoading = isLoadingNews || isLoadingNotices;

  const headlines = [
    ...(news?.map((item): Headline => ({
      type: 'news',
      title: item.title,
      id: item.id,
    })) ?? []),

    ...(notices?.map((item): Headline => ({
      type: 'notice',
      title: item.title,
      id: item.id,
    })) ?? []),
  ];

  return { headlines, isLoading };
};
