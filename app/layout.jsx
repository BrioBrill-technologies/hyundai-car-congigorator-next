import { Layout } from '@/components/dom/Layout'
import '@/global.css'

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
        <div className='flex flex-col gap-2 mx-auto w-full h-screen overflow-y-scroll'>
          <img src='/logo.png' alt='logo' className='w-2/12 mt-2 mx-auto' />
          {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  )
}
