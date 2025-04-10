'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handlePayment = async () => {
    setIsProcessing(true);
    // Ici, nous ajouterons l'intégration avec Stripe
    try {
      // Simulation du paiement pour l'instant
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur de paiement:', error);
      setIsProcessing(false);
    }
  };

  if (!isSignedIn) {
    router.push('/sign-up');
    return null;
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Dernière étape !</h1>
            <p className="text-gray-600">
              Votre site est prêt à être créé. Plus qu'un petit pas pour multiplier votre clientèle !
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Pack Business</h2>
              <span className="text-2xl font-bold">19.99€</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Site web professionnel personnalisé
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Système de réservation intégré
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Support technique prioritaire
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mises à jour gratuites
              </li>
            </ul>
            <div className="text-sm text-gray-500 mb-6">
              Paiement unique - Pas d'abonnement
            </div>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full py-6 text-lg"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Traitement en cours...
                </div>
              ) : (
                'Payer 19.99€ et créer mon site'
              )}
            </Button>
            <p className="text-center text-sm text-gray-500">
              Paiement sécurisé par Stripe
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 