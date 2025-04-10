import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyPage.ai - Créez votre site web avec l\'IA',
  description: 'Créez votre site web professionnel en quelques minutes avec l\'aide de l\'intelligence artificielle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50`}>
          <Navbar />
          <main className="flex-grow">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
} 