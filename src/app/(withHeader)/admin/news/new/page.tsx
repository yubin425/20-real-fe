'use client';

import { useState } from 'react';

export default function AdminNewsNewPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    const news = {
      title,
      content,
    };

    const formData = new FormData();
    formData.append('news', new Blob([JSON.stringify(news)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
    }

    // const res = await fetch('http://localhost:8080/api/v1/news', {
    const res = await fetch('http://test.kakaotech.com/api/v1/news', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      alert('업로드 성공');
      setTitle('');
      setContent('');
      setImage(null);
    } else {
      alert('업로드 실패');
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="bg-gray-50 min-h-app p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">어드민 뉴스 작성 페이지입니다.</h2>

      <input
        type="text"
        placeholder="제목"
        className="w-full border p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="내용"
        className="w-full border p-2 h-40"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div>
        <label className="block mb-1">사진 업로드</label>

        <div className="relative inline-block">
          <button
            type="button"
            className="border px-4 py-2 rounded-full text-sm bg-white hover:bg-gray-100"
            onClick={() => document.getElementById('image-upload-input')?.click()}
          >
            사진 선택
          </button>
          <input
            id="image-upload-input"
            type="file"
            accept="image/*"
            className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) setImage(files[0]);
            }}
          />
        </div>

        {image && (
          <ul className="mt-2 text-sm text-gray-700 space-y-1">
            <li className="flex items-center justify-between">
              <span>{image?.name}</span>
              <button onClick={() => removeImage()} className="text-red-500 hover:underline">
                X
              </button>
            </li>
          </ul>
        )}
      </div>

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        등록하기
      </button>
    </div>
  );
}
