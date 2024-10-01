import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { Inter, Playfair_Display, Noto_Serif } from 'next/font/google'
//Bodoni_Moda, Literata w/spacing
import { cn } from '@/lib/utils'

import './globals.css'
import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

// const playfair = Playfair_Display({
//   subsets: ['latin'],
//   variable: '--font-serif'
// })

const notoserif = Noto_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif'
})
const proxima = localFont({
  src: [
    {
      path: '../public/fonts/proxima/proximanova-reg-webfont.woff',
      weight: '400'
    }
  ],
  variable: '--font-sans'
})
export const metadata: Metadata = {
  title: 'Mary A Hayne - Portfolio',
  description: 'Created with NextJS and MDX'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          // inter.variable,
          //playfair.variable,
          proxima.variable,
          notoserif.variable
        )}
      >
        <Providers>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
