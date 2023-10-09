'use client'
import ComicPaginate from '@/components/ComicPaginate/ComicPaginate'
import { Comic, ComicsType } from '@/types/comics.type'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
// Định nghĩa kiểu cho props
interface Props {
   key: string
   getApi: (params: { page: number }) => Promise<AxiosResponse<ComicsType, any>>
   title: string
   icon: React.ReactNode
}
export default function MoreComics({ key, getApi, title, icon }: Props) {
   const router = useRouter()
   const pathname = usePathname()
   const [currentPage, setCurrentPage] = useState<number>(1)

   const { data } = useQuery({
      queryKey: [key, currentPage],
      queryFn: () => getApi({ page: currentPage })
   })
   const comics = data?.data.comics

   //pagination
   const totalPages: number = data?.data.total_pages as number
   const handlePageClick = (e: { selected: number }) => {
      if (totalPages) {
         setCurrentPage(e.selected + 1)
         document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
         router.push(`${pathname}?page=${e.selected + 1}`)
      }
   }
   useEffect(() => {
      if (currentPage === 1) {
         // Lần đầu truy cập, redirect về trang 1
         router.push(`${pathname}?page=1`)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentPage])
   useEffect(() => {
      document.title = `${title} - Page ${currentPage} | NetTruyen`
   }, [currentPage, title])
   return (
      <>
         <h2 className='flex mt-10 items-center gap-x-2 text-2xl sm:text-3xl font-bold mb-5'>
            {icon}
            <span>
               {title} - Page {currentPage}
            </span>
         </h2>
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
