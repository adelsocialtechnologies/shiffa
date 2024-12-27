import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { DoctorProvider } from '../context/DoctorContext';
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shiffa Admin Panel',
  description: 'Doctors appointment system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
      <DoctorProvider>{children}</DoctorProvider>
        </body>
    </html>
  )
}
