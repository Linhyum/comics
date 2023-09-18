import ReadComic from '@/modules/ReadComic/ReadComic'
import React from 'react'

export default function page({ params }: { params: { id: number } }) {
   return <ReadComic params={params} />
}
