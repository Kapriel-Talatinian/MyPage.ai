'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BookingSuccess() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const bookingDate = date ? new Date(date) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center space-y-6"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Réservation confirmée !
        </h1>

        {bookingDate && (
          <p className="text-gray-600">
            Votre rendez-vous est prévu le{' '}
            {bookingDate.toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
        )}

        <p className="text-gray-600">
          Vous recevrez bientôt un email de confirmation avec tous les détails.
        </p>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium"
        >
          Retour à l'accueil
        </motion.a>
      </motion.div>
    </div>
  );
} 