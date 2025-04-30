"use client"

import { useParams } from 'next/navigation';

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>()

  return (
    <>
      <div className="pt-header">{params.id} 포스트</div>
    </>
  )

}
