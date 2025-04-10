'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CalendarProps {
  name: string;
  location: string;
  rate: number;
}

// Define styles and script
const styles = `
  .calendar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .calendar button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;
  }
  .calendar button:hover {
    background-color: #e2e8f0;
  }
`;

const script = `
  console.log('Calendar script loaded');
`;

export default function Calendar({ name, location, rate }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setError(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setError(null);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    try {
      setLoading(true);
      setError(null);

      // Create a datetime by combining selected date and time
      const bookingDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      bookingDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Create a payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: rate * 100, // Convert to cents for Stripe
          serviceId: 'default',
          customerName: name,
          startTime: bookingDateTime.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Load Stripe
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: clientSecret,
        successUrl: `${window.location.origin}/booking-success?date=${bookingDateTime.toISOString()}`,
        cancelUrl: `${window.location.origin}/booking-cancelled`,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Inject styles and script on the client side
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const scriptTag = document.createElement("script");
    scriptTag.type = "text/javascript";
    scriptTag.innerText = script;
    document.body.appendChild(scriptTag);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDateSelect(date)}
              className={`p-3 rounded-lg text-center ${
                selectedDate?.toDateString() === date.toDateString()
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-sm font-medium">
                {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
              </div>
              <div className="text-lg font-bold">
                {date.getDate()}
              </div>
            </motion.button>
          );
        })}
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-medium text-gray-900">
            Choisissez un horaire
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <motion.button
                key={time}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTimeSelect(time)}
                className={`p-3 rounded-lg text-center ${
                  selectedTime === time
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {time}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {selectedDate && selectedTime && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBooking}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? 'Chargement...' : `Réserver et payer ${rate}€`}
        </motion.button>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 text-center"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
} 