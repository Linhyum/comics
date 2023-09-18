import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import React from 'react'
import Link from 'next/link'
import { Comic } from '@/types/comics.type'
import ComicItem from '../ComicItem/ComicItem'
interface Props {
   comics: Comic[]
   title: string
   linkMore: string
   icon: React.ReactNode
}
export default function ComicsList({ comics, title, linkMore, icon }: Props) {
   return (
      <>
         <div className='flex items-center justify-between mb-4 mt-10'>
            <h2 className='flex items-center gap-x-2 text-2xl sm:text-3xl font-bold'>
               {icon}
               {title}
            </h2>
            <Link
               href={linkMore}
               className='rounded-full font-bold px-4 py-1 overflow-hidden bg-transparent hover:border-transparent border-2 border-primary hover:bg-primary text-primary hover:text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary duration-300'
            >
               More
            </Link>
         </div>
         <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={20}
            slidesPerView={6}
            navigation //Kích hoạt điều hướng (nút prev và next) cho slider.
            // autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }} //Kích hoạt chế độ tự động chuyển slide. Trong trường hợp này, mỗi slide sẽ tự động chuyển sau 1 giây và sẽ không tắt khi người dùng tương tác với slider.
            breakpoints={{
               0: {
                  slidesPerView: 2,
                  spaceBetween: 12
               },
               640: {
                  slidesPerView: 3,
                  spaceBetween: 16
               },
               768: {
                  slidesPerView: 4,
                  spaceBetween: 16
               },
               1024: {
                  slidesPerView: 5,
                  spaceBetween: 16
               },
               1280: {
                  slidesPerView: 6,
                  spaceBetween: 16
               },
               1536: {
                  slidesPerView: 7,
                  spaceBetween: 16
               }
            }}
         >
            {comics.map((item) => (
               <SwiperSlide key={item.id}>
                  <ComicItem item={item} />
               </SwiperSlide>
            ))}
         </Swiper>
      </>
   )
}
