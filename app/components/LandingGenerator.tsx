'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  profession: string;
  rate: string;
  rateType: string;
  availability: string;
  location: string;
  bio: string;
  certifications: string;
  phone: string;
  email: string;
  social: string;
}

const questions = [
  { id: 'q1', field: 'name', label: '👋 Je m\'appelle :', type: 'text' },
  { id: 'q2', field: 'profession', label: '🧑‍💼 Je suis :', type: 'text' },
  { id: 'q3', field: 'rate', label: '💰 Mon tarif est :', type: 'number' },
  { id: 'q4', field: 'availability', label: '📆 Mes disponibilités :', type: 'select' },
  { id: 'q5', field: 'location', label: '📍 Je travaille à :', type: 'text' },
  { id: 'q6', field: 'bio', label: '📝 Présentation rapide :', type: 'textarea' },
  { id: 'q7', field: 'certifications', label: '🎓 Diplômes ou certifications :', type: 'text' },
  { id: 'q8', field: 'phone', label: '📞 Numéro de téléphone :', type: 'tel' },
  { id: 'q9', field: 'email', label: '📧 Adresse email :', type: 'email' },
  { id: 'q10', field: 'social', label: '🌐 Réseaux sociaux :', type: 'text' },
];

const availabilityOptions = [
  'Lundi au Vendredi',
  'Lundi, Mercredi, Vendredi',
  'Week-end uniquement',
  'Tous les jours',
];

const rateTypeOptions = [
  '€/heure',
  '€/demi-heure',
  '€/prestation',
];

export default function LandingGenerator() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    profession: '',
    rate: '',
    rateType: '€/heure',
    availability: 'Lundi au Vendredi',
    location: '',
    bio: '',
    certifications: '',
    phone: '',
    email: '',
    social: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-landing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          bio: await generateBio(formData),
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de la page');
      }

      const data = await response.json();
      localStorage.setItem('landingData', JSON.stringify(data));
      setShowFinalMessage(true);
      
      setTimeout(() => {
        router.push('/landing');
      }, 2000);
    } catch (err) {
      setError('Erreur lors de la génération de la page');
    } finally {
      setIsLoading(false);
    }
  };

  const generateBio = async (data: FormData) => {
    const prompt = `Crée une biographie professionnelle pour ${data.name}, ${data.profession} basée sur les informations suivantes :
    - Tarif : ${data.rate} ${data.rateType}
    - Disponibilités : ${data.availability}
    - Zone géographique : ${data.location}
    - Certifications : ${data.certifications}
    - Contact : ${data.phone}, ${data.email}
    - Réseaux sociaux : ${data.social}

    La biographie doit être professionnelle, engageante et mettre en valeur l'expertise de la personne.`;

    const response = await fetch('/api/generate-bio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la génération de la bio');
    }

    const { bio } = await response.json();
    return bio;
  };

  const currentQuestion = questions[currentStep];

  return (
    <div id="form-container">
      <AnimatePresence mode="wait">
        {!showFinalMessage ? (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            id="questions"
          >
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="question"
            >
              <label htmlFor={currentQuestion.field}>{currentQuestion.label}</label>
              
              {currentQuestion.type === 'text' && (
                <input
                  type="text"
                  id={currentQuestion.field}
                  name={currentQuestion.field}
                  value={formData[currentQuestion.field as keyof FormData] as string}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              )}

              {currentQuestion.type === 'number' && (
                <div className="flex gap-4">
                  <input
                    type="number"
                    id={currentQuestion.field}
                    name={currentQuestion.field}
                    value={formData[currentQuestion.field as keyof FormData] as string}
                    onChange={handleInputChange}
                    placeholder="Ex: 50"
                    className="flex-1"
                    required
                  />
                  <select
                    name="rateType"
                    value={formData.rateType}
                    onChange={handleInputChange}
                    className="flex-1"
                  >
                    {rateTypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              )}

              {currentQuestion.type === 'select' && (
                <select
                  id={currentQuestion.field}
                  name={currentQuestion.field}
                  value={formData[currentQuestion.field as keyof FormData] as string}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                >
                  {availabilityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}

              {currentQuestion.type === 'textarea' && (
                <textarea
                  id={currentQuestion.field}
                  name={currentQuestion.field}
                  value={formData[currentQuestion.field as keyof FormData] as string}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Parle un peu de toi..."
                  className="w-full"
                  required
                />
              )}

              {currentQuestion.type === 'tel' && (
                <input
                  type="tel"
                  id={currentQuestion.field}
                  name={currentQuestion.field}
                  value={formData[currentQuestion.field as keyof FormData] as string}
                  onChange={handleInputChange}
                  placeholder="06 12 34 56 78"
                  className="w-full"
                  required
                />
              )}

              {currentQuestion.type === 'email' && (
                <input
                  type="email"
                  id={currentQuestion.field}
                  name={currentQuestion.field}
                  value={formData[currentQuestion.field as keyof FormData] as string}
                  onChange={handleInputChange}
                  placeholder="tonadresse@mail.com"
                  className="w-full"
                  required
                />
              )}
            </motion.div>

            <div id="navigation-buttons">
              <button
                type="button"
                id="prev"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                Précédent
              </button>
              <button
                type="button"
                id="next"
                onClick={currentStep === questions.length - 1 ? handleSubmit : handleNext}
                disabled={isLoading}
              >
                {currentStep === questions.length - 1 ? 'Terminer' : 'Suivant'}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-center mt-4">{error}</p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="final-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            id="final-message"
          >
            <span className="wave">👋</span> Enchanté {formData.name} !
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 