export default function HeadlineBannerSkeleton() {
  return (
    <div className="bg-white mx-4 mt-4 rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-12 px-4 flex items-center space-x-3">
        {/* 아이콘 */}
        <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0" />

        {/* 텍스트 */}
        <div className="flex-1 h-4 bg-gray-200 rounded" />

        {/* 인덱스 */}
        <div className="w-10 h-3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
