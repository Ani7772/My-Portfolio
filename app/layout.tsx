import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Aniket.Design',
  description: 'Aniket Basu',
  generator: 'Aniket Basu',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
