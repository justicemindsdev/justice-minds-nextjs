import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Justice Minds Forensic Intelligence | Systems Restoration Through Analytics Not Accusation',
  description: 'Forensic investigation and intelligence services focused on equal treatment, fair rights, and cultural intelligence. Specializing in institutional accountability and systems restoration.',
  keywords: ['forensic intelligence', 'justice', 'investigation', 'cultural intelligence', 'institutional accountability'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
