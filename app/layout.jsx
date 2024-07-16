import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import Image from 'next/image'

export const metadata = {
  title: 'Hyundai - 3D Configurator',
  description: 'Hyundai 3D Configurator',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <link rel="icon" href="/icons/favicon.ico" sizes="any" />
      <head />
      <body>
        <div className='mx-auto flex h-screen w-full flex-col gap-2 overflow-y-scroll'>
          <Image 
            src='/logo.png'
            alt='logo' 
            width={75}
            height={75}
            className='mx-auto mt-2'
          />
          {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  )
}
