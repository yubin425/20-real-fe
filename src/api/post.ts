import { BaseResponse, CursorParam, CursorResponse } from '@/types/common/base';
import { fetcher } from '@/api/fetcher';
import { Notice } from '@/types/post/notice';
import { NoticeDetail } from '@/types/post/noticeDetail';
import { PostLike } from '@/types/post/postLike';
import { PostComment } from '@/types/post/postComment';

// 공지 리스트 조회
interface getNoticeListRequest extends CursorParam {
  limit: number;
}

const getNoticeList = async ({ cursorId = null, cursorStandard = null, limit = 10 }: getNoticeListRequest): Promise<BaseResponse<CursorResponse<Notice>>> => {
  const params = new URLSearchParams({
    ...(cursorId && { cursorId: cursorId.toString() }),
    ...(cursorStandard && { cursorStandard }),
    limit: limit.toString(),
  }).toString();

  return await fetcher(`/v1/notices?${params}`, {method: 'GET'});
};

// 공지 상세 조회
const getNoticeDetail = async (noticeId: string): Promise<BaseResponse<NoticeDetail>> => {
  return await fetcher(`/v1/notices/${noticeId}`, {method: 'GET'})
}

// 공지 댓글 리스트 조회
interface getNoticeCommentListRequest extends CursorParam {
  limit: number;
  noticeId: string;
}

const getNoticesCommentList = async ({ noticeId, cursorId = null, cursorStandard = null, limit = 10 }: getNoticeCommentListRequest): Promise<BaseResponse<CursorResponse<PostComment>>> => {
  const params = new URLSearchParams({
    ...(cursorId && { cursorId: cursorId.toString() }),
    ...(cursorStandard && { cursorStandard }),
    limit: limit.toString(),
  }).toString();

  return await fetcher(`/v1/notices/${noticeId}/comments?${params}`, {method: 'GET'});
}

// 공지 댓글 작성
interface postNoticeCommentRequest {
  noticeId: string;
  content: string;
}

const postNoticeComment = async ({ noticeId, content }: postNoticeCommentRequest) => {
  return await fetcher(`/v1/notices/${noticeId}/comments`, {
    method: 'POST',
    body: JSON.stringify({content})
  });
}

// 공지 좋아요 토글
const toggleNoticeLike = async (noticeId: string): Promise<BaseResponse<PostLike>> => {
  return await fetcher(`/v1/notices/${noticeId}/likes`, {method: 'PUT'});
}

// 공지 댓글 삭제
interface deleteNoticeCommentRequest {
  noticeId: string;
  commentId: string;
}

const deleteNoticeComment = async ({ noticeId, commentId }: deleteNoticeCommentRequest) => {
  return await fetcher(`/v1/notices/${noticeId}/comments/${commentId}`, {
    method: 'DELETE',
  })
}

export { getNoticeList, getNoticeDetail, getNoticesCommentList, toggleNoticeLike, postNoticeComment, deleteNoticeComment }
