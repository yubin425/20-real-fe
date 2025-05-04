import { fetcher } from '@/api/fetcher';
import { News } from '@/types/post/news';
import { BaseResponse, CursorParam, CursorResponse } from '@/types/common/base';
import { NewsDetail } from '@/types/post/newsDetail';
import { PostComment } from '@/types/post/postComment';
import { PostLike } from '@/types/post/postLike';

// 뉴스 리스트 조회
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

// 뉴스 상세 조회
const getNewsDetail = async (newsId: string): Promise<BaseResponse<NewsDetail>> => {
  return await fetcher(`/v1/news/${newsId}`, {method: 'GET'})
}

// 뉴스 댓글 리스트 조회
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

// 뉴스 댓글 작성
interface postNewsCommentRequest {
  newsId: string;
  content: string;
}

const postNewsComment = async ({ newsId, content }: postNewsCommentRequest) => {
  return await fetcher(`/v1/news/${newsId}/comments`, {
    method: 'POST',
    body: JSON.stringify({content})
  });
}

// 뉴스 좋아요 토글
const toggleNewsLike = async (newsId: string): Promise<BaseResponse<PostLike>> => {
  return await fetcher(`/v1/news/${newsId}/likes`, {method: 'PUT'});
}

// 뉴스 댓글 삭제
interface deleteNewsCommentRequest {
  newsId: string;
  commentId: string;
}

const deleteNewsComment = async ({ newsId, commentId }: deleteNewsCommentRequest) => {
  return await fetcher(`/v1/news/${newsId}/comments/${commentId}`, {
    method: 'DELETE',
  })
}


export { getNewsList, getNewsDetail, getNewsCommentList, toggleNewsLike, postNewsComment, deleteNewsComment }
