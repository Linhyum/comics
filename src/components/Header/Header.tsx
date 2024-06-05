'use client'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import Tippy from '@tippyjs/react'
import 'tippy.js/animations/perspective-extreme.css'
import { useQuery } from '@tanstack/react-query'
import { searchSuggest } from '@/api/home.api'
const links: {
   title: string
   url: string
   active: string
   icon: React.ReactNode
}[] = [
   {
      title: 'Home',
      url: '/',
      active: '/',
      icon: (
         <svg
            data-v-c3ad5561
            data-v-eb07a472
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            role='img'
            className='icon mr-1'
            width='20px'
            height='20px'
            viewBox='0 0 512 512'
         >
            <path
               fill='none'
               stroke='currentColor'
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth={32}
               d='M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212'
            />
            <path
               fill='none'
               stroke='currentColor'
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth={32}
               d='M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69'
            />
         </svg>
      )
   },
   {
      title: 'Genres',
      url: '/genres?type=all',
      active: '/genres',
      icon: (
         <svg
            data-v-c3ad5561
            data-v-eb07a472
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            role='img'
            className='icon mr-1'
            width='20px'
            height='20px'
            viewBox='0 0 640 512'
         >
            <path
               fill='currentColor'
               d='M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48c0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8c0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8c26.5 0 48-21.5 48-48s-21.5-48-48-48z'
            />
         </svg>
      )
   },
   {
      title: 'New',
      url: '/new',
      active: '/new',
      icon: (
         <svg
            data-v-c3ad5561
            data-v-eb07a472
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            role='img'
            className='icon mr-1'
            width='20px'
            height='20px'
            viewBox='0 0 36 36'
         >
            <path
               fill='currentColor'
               d='m34.11 24.49l-3.92-6.62l3.88-6.35a1 1 0 0 0-.85-1.52H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h31.25a1 1 0 0 0 .86-1.51Zm-23.6-3.31H9.39l-3.26-4.34v4.35H5V15h1.13l3.27 4.35V15h1.12ZM16.84 16h-3.53v1.49h3.2v1h-3.2v1.61h3.53v1h-4.66V15h4.65Zm8.29 5.16H24l-1.55-4.59l-1.55 4.61h-1.12l-2-6.18H19l1.32 4.43L21.84 15h1.22l1.46 4.43L25.85 15h1.23Z'
               className='clr-i-solid clr-i-solid-path-1'
            />
            <path fill='none' d='M0 0h36v36H0z' />
         </svg>
      )
   },
   {
      title: 'Top',
      url: '/top?tab=all',
      active: '/top',
      icon: (
         <svg
            data-v-c3ad5561
            data-v-eb07a472
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            role='img'
            className='icon mr-1'
            width='20px'
            height='20px'
            viewBox='0 0 36 36'
         >
            <path
               fill='currentColor'
               d='M25.711 10.867L18.779.652c-.602-.885-1.558-.867-2.127.037l-6.39 10.141c-.569.904-.181 1.644.865 1.644H13V16a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3.525h1.898c1.047 0 1.414-.723.813-1.608zM3.651 23.575H1.438c-.975 0-1.381-.712-1.381-1.401c0-.71.508-1.399 1.381-1.399h7.469c.874 0 1.381.689 1.381 1.399c0 .69-.406 1.401-1.381 1.401H6.696v10.189c0 1.016-.649 1.584-1.522 1.584s-1.522-.568-1.522-1.584V23.575zM10.396 28c0-4.222 2.841-7.471 6.982-7.471c4.079 0 6.983 3.351 6.983 7.471c0 4.201-2.821 7.471-6.983 7.471c-4.121 0-6.982-3.27-6.982-7.471zm10.798 0c0-2.456-1.279-4.67-3.816-4.67s-3.816 2.214-3.816 4.67c0 2.476 1.239 4.668 3.816 4.668c2.578 0 3.816-2.192 3.816-4.668zm4.433-5.644c0-.954.569-1.582 1.585-1.582h3.591c2.985 0 5.197 1.947 5.197 4.851c0 2.963-2.293 4.811-5.074 4.811h-2.253v3.329c0 1.016-.649 1.584-1.521 1.584c-.874 0-1.524-.568-1.524-1.584V22.356zm3.046 5.4h2.071c1.277 0 2.089-.934 2.089-2.151c0-1.219-.812-2.152-2.089-2.152h-2.071v4.303z'
            />
         </svg>
      )
   }
]
export default function Header() {
   const pathname = usePathname()
   const router = useRouter()
   const [scrollingUp, setScrollingUp] = useState<boolean>(false)
   const [prevScrollPos, setPrevScrollPos] = useState<number>(0)
   const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('dark', true)
   const [openSearchSuggest, setOpenSearchSuggest] = useState<boolean>(false)
   const [valueSearch, setValueSearch] = useState<string>('')
   const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false)
   useEffect(() => {
      const handleScroll = () => {
         const currentScrollPos = window.pageYOffset
         setScrollingUp(currentScrollPos < prevScrollPos)
         setPrevScrollPos(currentScrollPos)
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [prevScrollPos])

   useEffect(() => {
      if (isDarkMode) {
         document.documentElement.classList.add('dark')
      } else {
         document.documentElement.classList.remove('dark')
      }
   }, [isDarkMode])

   const { data } = useQuery({
      queryKey: ['searchSuggest', valueSearch],
      queryFn: () => searchSuggest({ q: valueSearch }),
      enabled: Boolean(valueSearch)
   })
   const searchSuggestData = data?.data

   useEffect(() => {
      if (openMenuMobile) {
         document.body.classList.add('hide-scroll')
      } else {
         document.body.classList.remove('hide-scroll')
      }
   }, [openMenuMobile])
   return (
      <header
         style={{
            position: scrollingUp ? 'fixed' : 'absolute',
            top: scrollingUp ? '0' : 'auto'
         }}
         className='h-14 shadow-lg z-50 w-full transition-all duration-500 bg-white dark:bg-slate-900'
      >
         <div className='container h-full flex items-center justify-between lg:justify-normal'>
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
            <nav className='items-center gap-x-3 ml-6 hidden lg:flex'>
               {links?.map((item) => (
                  <Link
                     className={`text-lg py-2 px-4 rounded-full font-bold ${
                        pathname === item.active ? 'bg-primary text-white' : 'hover:text-primary'
                     }`}
                     href={item.url}
                     key={item.title}
                  >
                     {item.title}
                  </Link>
               ))}
            </nav>
            <Link href={'/history'} className='ml-auto hidden lg:block'>
               <svg
                  data-v-c3ad5561
                  data-v-eb07a472
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='icon text-blue-500'
                  width='30px'
                  height='30px'
                  viewBox='0 0 24 24'
               >
                  <path
                     fill='currentColor'
                     d='M13 3a9 9 0 0 0-9 9H1l3.89 3.89l.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.25 2.52l.77-1.28l-3.52-2.09V8z'
                  />
               </svg>
            </Link>
            <button onClick={() => setIsDarkMode((prev) => !prev)} className='ml-6 hidden lg:block'>
               {isDarkMode ? (
                  <svg
                     viewBox='0 0 24 24'
                     fill='none'
                     strokeWidth={2}
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     className='w-8 h-8'
                  >
                     <path d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' className='stroke-slate-700 dark:stroke-white' />
                     <path
                        d='M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836'
                        className='stroke-slate-700 dark:stroke-white'
                     />
                  </svg>
               ) : (
                  <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
                     <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z'
                        className='fill-transparent'
                     />
                     <path
                        d='m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z'
                        className='fill-slate-700 dark:fill-white'
                     />
                     <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z'
                        className='fill-slate-700 dark:fill-white'
                     />
                  </svg>
               )}
            </button>
            <Tippy
               animation={'perspective-extreme'}
               onClickOutside={() => setOpenSearchSuggest(false)}
               visible={Boolean(valueSearch) && openSearchSuggest}
               content={
                  <ul className='dark:bg-[#333] hidden sm:block bg-white rounded-lg shadow-lg w-[280px] max-h-[320px] overflow-y-auto'>
                     {searchSuggestData?.map((item) => (
                        <li key={item.id}>
                           <Link
                              href={`/comic/${item.id}`}
                              className='p-2 border-b dark:border-b-gray-600 border-b-gray-300 flex items-center gap-x-2 hover:bg-gray-200 dark:hover:bg-white dark:hover:bg-opacity-10'
                           >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                 src={item.thumbnail}
                                 alt={item.title}
                                 width={64}
                                 height={96}
                                 className='w-[64px] h-[96px] object-cover rounded border border-primary'
                              />
                              <div className='flex flex-col justify-between'>
                                 <h3>
                                    <span className='font-bold'>{item.title}</span> ({item.lastest_chapter})
                                 </h3>
                                 <span className='text-primary font-bold'>{item.authors}</span>
                                 <span className='leading-tight'>
                                    {item.genres?.map((i, index) => i + (index === item.genres.length - 1 ? '' : ', '))}
                                 </span>
                              </div>
                           </Link>
                        </li>
                     ))}
                  </ul>
               }
               interactive={true}
               arrow={false}
               offset={[0, 6]}
               placement={'bottom-end'}
            >
               <form
                  onSubmit={(e) => {
                     e.preventDefault()
                     router.push(`/search?q=${valueSearch}`)
                  }}
                  className='lg:ml-8 hidden sm:flex w-[280px] lg:w-[unset] items-center border border-gray-300 py-2 focus-within:border-primary rounded-full'
               >
                  <input
                     onFocus={() => setOpenSearchSuggest(true)}
                     onBlur={() => setOpenSearchSuggest(false)}
                     onChange={(e) =>
                        setTimeout(() => {
                           setValueSearch(e.target.value)
                        }, 1000)
                     }
                     type='text'
                     className='outline-none border-none pl-3 bg-transparent w-full'
                     placeholder='Search comics/authors'
                  />
                  <span className='px-3'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2}
                        stroke='currentColor'
                        className='w-[18px] h-[18px] '
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                        />
                     </svg>
                  </span>
               </form>
            </Tippy>

            {/* button menu mobile */}
            <button onClick={() => setOpenMenuMobile(true)} className='lg:hidden'>
               <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8'>
                  <path
                     fillRule='evenodd'
                     d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
                     clipRule='evenodd'
                  />
               </svg>
            </button>
            {/* menu mobile */}
            <div
               className={`fixed z-10 inset-y-0 right-0 w-[300px] dark:bg-[#333] p-4 bg-white shadow-lg transition-transform duration-300 ${
                  openMenuMobile ? 'translate-x-0' : 'translate-x-full'
               }`}
            >
               <button onClick={() => setIsDarkMode((prev) => !prev)} className='absolute top-2 left-2'>
                  {isDarkMode ? (
                     <svg
                        viewBox='0 0 24 24'
                        fill='none'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='w-8 h-8'
                     >
                        <path d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' className='stroke-slate-700 dark:stroke-white' />
                        <path
                           d='M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836'
                           className='stroke-slate-700 dark:stroke-white'
                        />
                     </svg>
                  ) : (
                     <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
                        <path
                           fillRule='evenodd'
                           clipRule='evenodd'
                           d='M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z'
                           className='fill-transparent'
                        />
                        <path
                           d='m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z'
                           className='fill-slate-700 dark:fill-white'
                        />
                        <path
                           fillRule='evenodd'
                           clipRule='evenodd'
                           d='M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z'
                           className='fill-slate-700 dark:fill-white'
                        />
                     </svg>
                  )}
               </button>
               <button onClick={() => setOpenMenuMobile(false)} className='absolute top-2 right-2'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8'>
                     <path
                        fillRule='evenodd'
                        d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                        clipRule='evenodd'
                     />
                  </svg>
               </button>
               <Tippy
                  animation={'perspective-extreme'}
                  onClickOutside={() => setOpenSearchSuggest(false)}
                  visible={Boolean(valueSearch) && openSearchSuggest}
                  content={
                     <ul className='dark:bg-slate-900 bg-white sm:hidden rounded-lg shadow-lg w-[280px] max-h-[320px] overflow-y-auto'>
                        {searchSuggestData?.map((item) => (
                           <li key={item.id}>
                              <Link
                                 href={`/comic/${item.id}`}
                                 className='p-2 border-b dark:border-b-gray-600 border-b-gray-300 flex items-center gap-x-2 hover:bg-gray-200 dark:hover:bg-white dark:hover:bg-opacity-10'
                              >
                                 {/* eslint-disable-next-line @next/next/no-img-element */}
                                 <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    width={64}
                                    height={96}
                                    className='w-[64px] h-[96px] object-cover rounded border border-primary'
                                 />
                                 <div className='flex flex-col justify-between'>
                                    <h3>
                                       <span className='font-bold'>{item.title}</span> ({item.lastest_chapter})
                                    </h3>
                                    <span className='text-primary font-bold'>{item.authors}</span>
                                    <span className='leading-tight'>
                                       {item.genres?.map(
                                          (i, index) => i + (index === item.genres.length - 1 ? '' : ', ')
                                       )}
                                    </span>
                                 </div>
                              </Link>
                           </li>
                        ))}
                     </ul>
                  }
                  interactive={true}
                  arrow={false}
                  offset={[0, 6]}
                  placement={'bottom-end'}
               >
                  <form
                     onSubmit={(e) => {
                        e.preventDefault()
                        setOpenMenuMobile(false)
                        router.push(`/search?q=${valueSearch}`)
                     }}
                     className='mt-10 flex items-center sm:hidden border border-gray-300 py-2 focus-within:border-primary rounded-full'
                  >
                     <input
                        onFocus={() => setOpenSearchSuggest(true)}
                        onBlur={() => setOpenSearchSuggest(false)}
                        onChange={(e) => setValueSearch(e.target.value)}
                        type='text'
                        className='outline-none border-none pl-3 bg-transparent w-full'
                        placeholder='Search comics/authors'
                     />
                     <span className='px-3'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           fill='none'
                           viewBox='0 0 24 24'
                           strokeWidth={2}
                           stroke='currentColor'
                           className='w-[18px] h-[18px] '
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                           />
                        </svg>
                     </span>
                  </form>
               </Tippy>
               <ul className='mt-5 sm:mt-10 text-lg flex flex-col gap-y-2 font-medium'>
                  {links?.map((item) => (
                     <li key={item.title}>
                        <Link
                           onClick={() => setOpenMenuMobile(false)}
                           className={`flex items-center gap-x-1 w-full py-1 hover:text-primary transition-colors ${
                              pathname === item.active && 'text-primary'
                           }`}
                           href={item.url}
                        >
                           {item.icon}
                           <span className='translate-y-[1px]'>{item.title}</span>
                        </Link>
                     </li>
                  ))}
                  <li>
                     <Link
                        onClick={() => setOpenMenuMobile(false)}
                        className={`flex items-center gap-x-1 w-full py-1 hover:text-primary transition-colors ${
                           pathname === 'history' && 'text-primary'
                        }`}
                        href={'/history'}
                     >
                        <svg
                           data-v-c3ad5561
                           data-v-eb07a472
                           xmlns='http://www.w3.org/2000/svg'
                           xmlnsXlink='http://www.w3.org/1999/xlink'
                           aria-hidden='true'
                           role='img'
                           className='icon mr-1'
                           width='20px'
                           height='20px'
                           viewBox='0 0 24 24'
                        >
                           <path
                              fill='currentColor'
                              d='M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5Z'
                           />
                        </svg>

                        <span className='translate-y-[1px]'>History</span>
                     </Link>
                  </li>
               </ul>
            </div>

            {/* overlay mobile */}
            {openMenuMobile && <div onClick={() => setOpenMenuMobile(false)} className='fixed inset-0 bg-black/50' />}
         </div>
      </header>
   )
}
