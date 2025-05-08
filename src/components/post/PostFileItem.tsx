import { Paperclip } from 'lucide-react';

import { NoticeFile } from '@/types/post/noticeFile';

interface PostFileItemProps {
  file: NoticeFile;
}

export default function PostFileItem({ file }: PostFileItemProps) {
  return (
    <div className="mb-4 bg-gray-50 rounded-lg p-3">
      <div className="flex items-center text-gray-600 text-sm">
        <Paperclip size={16} className="mr-2 text-gray-500" />
        <span>
          {file.fileName}.{file.fileType}
        </span>
      </div>
    </div>
  );
}
