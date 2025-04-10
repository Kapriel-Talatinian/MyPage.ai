'use client'

import Link from 'next/link'
import { UserButton, SignInButton, SignUpButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'

export default function Navbar() {
  const { isSignedIn } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MyPage.ai
              </span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Accueil
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Tarifs
              </Link>
              <Link
                href="/features"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Fonctionnalités
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                    Connexion
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md">
                    S'inscrire gratuitement
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
            >
              Accueil
            </Link>
            <Link
              href="/pricing"
              className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
            >
              Tarifs
            </Link>
            <Link
              href="/features"
              className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
            >
              Fonctionnalités
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
            >
              Contact
            </Link>
            {!isSignedIn && (
              <div className="pt-4 pb-3 border-t border-gray-100">
                <div className="px-4 space-y-2">
                  <SignInButton mode="modal">
                    <button className="w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600">
                      Connexion
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full text-center px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md hover:from-indigo-700 hover:to-purple-700">
                      S'inscrire gratuitement
                    </button>
                  </SignUpButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
} 