import { fetcher } from '@/api/fetcher';
import { News } from '@/types/post/news';
import { BaseResponse, CursorParam, CursorResponse } from '@/types/common/base';

interface getNewsListRequest extends CursorParam {
  limit: number;
  sort: 'popular' | 'latest';
}

const getNewsList = async ({ cursorId = null, cursorStandard = null, limit = 10, sort }: getNewsListRequest): Promise<BaseResponse<CursorResponse<News>>> => {
  const params = new URLSearchParams({
    ...(cursorId && { cursorId: cursorId.toString() }),
    ...(cursorStandard && { cursorStandard }),
    limit: limit.toString(),
    sort,
  }).toString();

  return await fetcher(`/v1/news?${params}`);
};

export { getNewsList }
