import './globals.scss'
import type { Metadata } from 'next'
import { ReactQueryProvider } from './ReactQueryProvider'
import { AppProvider } from '@/context/app.context'
import Header from '@/components/Header/Header'

export const metadata: Metadata = {
   title: 'Đọc Truyện Tranh Online - Website chính thức - NetTruyen.COM',
   description:
      'Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚10 triệu thành viên tại NetTruyen',
   openGraph: {
      images: '/ogImage.png'
   }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <ReactQueryProvider>
         <AppProvider>
            <html lang='en'>
               <body className='dark:bg-slate-900 dark:text-white'>
                  <Header />
                  <main className='container pt-14 pb-10'>{children}</main>
               </body>
            </html>
         </AppProvider>
      </ReactQueryProvider>
   )
}
