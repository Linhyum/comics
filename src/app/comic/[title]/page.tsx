import ComicDetail from '@/modules/ComicDetail/ComicDetail'
import React from 'react'

export default function page({ params }: { params: { title: string } }) {
   return <ComicDetail params={params} />
}
