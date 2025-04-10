'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const router = useRouter()

  const features = [
    'Site web professionnel personnalisé',
    'Système de réservation intégré',
    'Page de réservation conversationnelle',
    'Tableau de bord de gestion',
    'Paiements en ligne sécurisés',
    'Notifications automatiques',
    'Support technique prioritaire',
    'Mises à jour gratuites',
    'Hébergement inclus',
    'Certificat SSL inclus'
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">
            Un tarif unique pour tout débloquer
          </h1>
          <p className="text-xl text-gray-600">
            Pas d'abonnement, pas de frais cachés. Un seul paiement pour lancer votre activité.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-2">Pack Business Complet</h2>
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl font-bold">19.99€</span>
                <span className="ml-2 text-indigo-100">paiement unique</span>
              </div>
              <p className="text-indigo-100">
                Tout ce dont vous avez besoin pour réussir en ligne
              </p>
            </div>

            <div className="p-8">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center text-gray-600"
                  >
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="mt-8"
              >
                <Button
                  className="w-full py-6 text-lg"
                  onClick={() => router.push('/create')}
                >
                  Commencer maintenant
                </Button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Satisfait ou remboursé pendant 30 jours
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Des questions ?</h3>
            <p className="text-gray-600 mb-4">
              Notre équipe est là pour vous aider à démarrer
            </p>
            <Button
              variant="outline"
              onClick={() => router.push('/contact')}
            >
              Contactez-nous
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 