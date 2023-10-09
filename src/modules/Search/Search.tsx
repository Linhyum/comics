'use client'
import { search } from '@/api/home.api'
import ComicPaginate from '@/components/ComicPaginate/ComicPaginate'
import { Comic } from '@/types/comics.type'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function Search() {
   const searchParams = useSearchParams()
   const router = useRouter()
   const searchValue = searchParams.get('q') as string
   const [currentPage, setCurrentPage] = useState<number>(1)

   const { data } = useQuery({
      queryKey: ['search', searchValue, currentPage],
      queryFn: () => search({ q: searchValue, page: currentPage })
   })
   const comics = data?.data.comics
   //pagination
   const totalPages: number = data?.data.total_pages as number
   const handlePageClick = (e: { selected: number }) => {
      if (totalPages) {
         setCurrentPage(e.selected + 1)
         document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
         router.push(`/search?q=${searchValue}&page=${e.selected + 1}`)
      }
   }
   useEffect(() => {
      if (currentPage === 1) {
         // Lần đầu truy cập, redirect về trang 1
         router.push(`/search?q=${searchValue}&page=1`)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentPage])

   useEffect(() => {
      if (searchValue) {
         document.title = `Tìm kiếm: ${searchValue} | NetTruyen`
      }
   }, [searchValue])
   return (
      <>
         <h1 className='font-bold text-2xl mt-8 mb-5'>
            Search result: <span className='text-primary'>{searchValue}</span>
         </h1>
         <ComicPaginate
            setCurrentPage={setCurrentPage}
            comics={comics as Comic[]}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
            totalPages={totalPages}
         />
      </>
   )
}
