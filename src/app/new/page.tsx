'use client'
import { getNewComics } from '@/api/home.api'
import MoreComics from '@/modules/MoreComics/MoreComics'
import React from 'react'

export default function page() {
   return (
      <MoreComics
         icon={
            <svg
               data-v-c3ad5561
               data-v-79e96eab
               xmlns='http://www.w3.org/2000/svg'
               xmlnsXlink='http://www.w3.org/1999/xlink'
               aria-hidden='true'
               role='img'
               className='icon text-emerald-500'
               width='36px'
               height='36px'
               viewBox='0 0 36 36'
            >
               <path
                  fill='currentColor'
                  d='m34.11 24.49l-3.92-6.62l3.88-6.35a1 1 0 0 0-.85-1.52H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h31.25a1 1 0 0 0 .86-1.51Zm-23.6-3.31H9.39l-3.26-4.34v4.35H5V15h1.13l3.27 4.35V15h1.12ZM16.84 16h-3.53v1.49h3.2v1h-3.2v1.61h3.53v1h-4.66V15h4.65Zm8.29 5.16H24l-1.55-4.59l-1.55 4.61h-1.12l-2-6.18H19l1.32 4.43L21.84 15h1.22l1.46 4.43L25.85 15h1.23Z'
                  className='clr-i-solid clr-i-solid-path-1'
               />
               <path fill='none' d='M0 0h36v36H0z' />
            </svg>
         }
         title='New Comics'
         key='new'
         getApi={getNewComics}
      />
   )
}
