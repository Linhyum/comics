import Link from 'next/link'
import React from 'react'

export default function Footer() {
   return (
      <footer className='dark:bg-[#121212] py-4 border-t-4 border-green-500'>
         <div className='container grid grid-cols-1 gap-y-5 sm:grid-cols-2'>
            <div>
               <Link href={'/'}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                     src={'/logo.png'}
                     alt='nettruyen'
                     width={150}
                     height={30}
                     className='w-[150px] h-[30px] object-cover'
                  />
               </Link>
               <div className='sm:mt-3 font-medium leading-loose'>
                  <p>Thế Giới Truyện Tiên Hiệp Huyền Ảo.</p>
                  <p>Email: nettruyen@gmail.com</p>
                  <p>Copyright © 2022 NetTruyen</p>
               </div>
            </div>
            <div>
               <h2 className='text-xl font-extrabold'>
                  <span className='text-blue-500'>About</span> <span className='text-red-500'>Us</span>
               </h2>
               <div className='sm:mt-3 font-medium leading-loose'>
                  <p>Tu tiên ta đắc đạo lúc nào chẳng hay!</p>
                  <p>Nền tảng nội dung số chất lượng cao</p>
                  <p>Ngày thành lập: 6/6/2022</p>
               </div>
            </div>
         </div>
      </footer>
   )
}
