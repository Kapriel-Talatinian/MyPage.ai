'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-4">MyPage.ai</h3>
            <p className="text-gray-500 text-sm">
              Créez votre site professionnel en quelques minutes avec l'aide de l'IA.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-500 hover:text-gray-700 text-sm">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-500 hover:text-gray-700 text-sm">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Aide</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-500 hover:text-gray-700 text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-gray-700 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Légal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-gray-700 text-sm">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} MyPage.ai - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  )
} 