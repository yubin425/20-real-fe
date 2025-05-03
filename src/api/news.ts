import { fetcher } from '@/api/fetcher';
import { News } from '@/types/post/news';
import { BaseResponse, CursorParam, CursorResponse } from '@/types/common/base';
import { NewsDetail } from '@/types/post/newsDetail';
import { PostComment } from '@/types/post/postComment';

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

  return await fetcher(`/v1/news?${params}`, {method: 'GET'});
};

const getNewsDetail = async (newsId: string): Promise<BaseResponse<NewsDetail>> => {
  return await fetcher(`/v1/news/${newsId}`, {method: 'GET'})
}

interface getNewsCommentListRequest extends CursorParam {
  limit: number;
  newsId: string;
}

const getNewsCommentList = async ({ newsId, cursorId = null, cursorStandard = null, limit = 10 }: getNewsCommentListRequest): Promise<BaseResponse<CursorResponse<PostComment>>> => {
  const params = new URLSearchParams({
    ...(cursorId && { cursorId: cursorId.toString() }),
    ...(cursorStandard && { cursorStandard }),
    limit: limit.toString(),
  }).toString();

  return await fetcher(`/v1/news/${newsId}/comments?${params}`, {method: 'GET'});
}

export { getNewsList, getNewsDetail, getNewsCommentList }
