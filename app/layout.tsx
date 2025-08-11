import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

import Footer from '@/components/Footer'
import UIWrapper from '@/components/UIWrapper' // this is the new wrapper

export const metadata: Metadata = {
  title: 'Aarambh',
  description: 'A collaborative learning platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-white text-black font-sans">
        <UIWrapper>{children}</UIWrapper>
        <Footer />
      </body>
    </html>
  )
}
