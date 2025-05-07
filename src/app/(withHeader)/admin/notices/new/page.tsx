"use client"

import { useState } from 'react';

const userNames = [
  { value: 'helper.ryan(헬퍼라이언)' },
  { value: 'void.yeon(연시완)/강사' },
  { value: 'kevin.seo(서상기)/풀스택주강사' },
  { value: 'alex.lee(이창신)/인공지능주강사' },
  { value: 'daniel.jung(정주신)/클라우드주강사' },
  { value: 'tami.kim(김현)/관리자' },
  { value: 'diana.kim(김예슬)/관리자' },
];

const tags = [
  '공지',
  '풀스택 공지',
  '인공지능 공지',
  '클라우드 공지'
];

const platforms = [
  '디스코드',
  '노션'
]

export default function AdminNoticeNewPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState(tags[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [userName, setUserName] = useState(userNames[0].value);
  const [originalUrl, setOriginalUrl] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async () => {
    const notice = {
      title,
      content,
      tag,
      platform,
      userName,
      originalUrl,
    };

    const formData = new FormData();
    formData.append('notice', new Blob([JSON.stringify(notice)], { type: 'application/json' }));
    images.forEach((img) => formData.append('images', img));
    files.forEach((file) => formData.append('files', file));

    console.log(formData);

    // const res = await fetch('http://localhost:8080/api/v1/notices/tmp', {
    const res = await fetch('http://test.kakaotech.com/api/v1/notices/tmp', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('업로드 성공');
      setTitle('');
      setContent('');
      setTag(tags[0]);
      setPlatform(platforms[0]);
      setUserName(userNames[0].value)
      setOriginalUrl('')
      setImages([])
      setFiles([])

    } else {
      alert('업로드 실패');
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-50 min-h-app p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">임시 공지 작성 페이지입니다.</h2>

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

      <input
        type="text"
        placeholder="원본 주소"
        className="w-full border p-2"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />

      <select className="w-full border p-2" value={tag} onChange={(e) => setTag(e.target.value)}>
        {tags.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select className="w-full border p-2" value={tag} onChange={(e) => setPlatform(e.target.value)}>
        {platforms.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select className="w-full border p-2" value={userName} onChange={(e) => setUserName(e.target.value)}>
        {userNames.map((a) => (
          <option key={a.value} value={a.value}>{a.value}</option>
        ))}
      </select>

      <div>
        <label className="block mb-1">사진 업로드 (최대 10장)</label>

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
            multiple
            accept="image/*"
            className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => {
              const files = e.target.files;
              if (files) setImages(Array.from(files).slice(0, 10));
            }}
          />
        </div>

        <ul className="mt-2 text-sm text-gray-700 space-y-1">
          {images.map((file, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span>{file.name}</span>
              <button
                onClick={() => removeImage(idx)}
                className="text-red-500 hover:underline"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label className="block mb-1">파일 업로드 (최대 10장)</label>

        <div className="relative inline-block">
          <button
            type="button"
            className="border px-4 py-2 rounded-full text-sm bg-white hover:bg-gray-100"
            onClick={() => document.getElementById('file-upload-input')?.click()}
          >
            파일 선택
          </button>
          <input
            id="file-upload-input"
            type="file"
            multiple
            className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => {
              const files = e.target.files;
              if (files) setFiles(Array.from(files).slice(0, 10));
            }}
          />
        </div>

        <ul className="mt-2 text-sm text-gray-700 space-y-1">
          {files.map((file, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span>{file.name}</span>
              <button
                onClick={() => removeFile(idx)}
                className="text-red-500 hover:underline"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        등록하기
      </button>
    </div>
  );
}
