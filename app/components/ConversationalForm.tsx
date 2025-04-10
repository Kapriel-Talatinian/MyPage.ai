'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';

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
  socialLinks: string;
}

const questions = [
  {
    id: 'name',
    emoji: '👋',
    label: 'Comment vous appelez-vous ?',
    type: 'text',
    placeholder: 'Votre nom complet',
    required: true,
  },
  {
    id: 'profession',
    emoji: '💼',
    label: 'Quelle est votre profession ?',
    type: 'text',
    placeholder: 'Ex: Coach sportif, Thérapeute, etc.',
    required: true,
  },
  {
    id: 'rate',
    emoji: '💰',
    label: 'Quel est votre tarif ?',
    type: 'number',
    placeholder: 'Ex: 50',
    required: true,
  },
  {
    id: 'rateType',
    emoji: '⏱️',
    label: 'Par quelle unité ?',
    type: 'select',
    options: ['Par heure', 'Par séance', 'Par mois', 'Par forfait'],
    required: true,
  },
  {
    id: 'availability',
    emoji: '📅',
    label: 'Quelles sont vos disponibilités ?',
    type: 'select',
    options: ['Lundi-Vendredi', 'Week-end uniquement', 'Tous les jours', 'Sur rendez-vous'],
    required: true,
  },
  {
    id: 'location',
    emoji: '📍',
    label: 'Où exercez-vous ?',
    type: 'text',
    placeholder: 'Ex: Paris, Lyon, etc.',
    required: true,
  },
  {
    id: 'bio',
    emoji: '✨',
    label: 'Parlez-nous un peu de vous',
    type: 'textarea',
    placeholder: 'Une brève introduction qui sera optimisée par notre IA',
    required: true,
  },
  {
    id: 'certifications',
    emoji: '🎓',
    label: 'Avez-vous des certifications ?',
    type: 'textarea',
    placeholder: 'Listez vos certifications (une par ligne)',
    required: false,
  },
  {
    id: 'phone',
    emoji: '📱',
    label: 'Votre numéro de téléphone',
    type: 'tel',
    placeholder: 'Ex: 06 12 34 56 78',
    required: true,
  },
  {
    id: 'email',
    emoji: '📧',
    label: 'Votre adresse email',
    type: 'email',
    placeholder: 'Ex: contact@exemple.com',
    required: true,
  },
  {
    id: 'socialLinks',
    emoji: '🔗',
    label: 'Vos réseaux sociaux',
    type: 'textarea',
    placeholder: 'Liens vers vos profils sociaux (un par ligne)',
    required: false,
  },
];

export default function ConversationalForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    profession: '',
    rate: '',
    rateType: '',
    availability: '',
    location: '',
    bio: '',
    certifications: '',
    phone: '',
    email: '',
    socialLinks: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);

  const handleInputChange = (value: string) => {
    const currentQuestion = questions[currentStep];
    
    // Validation spécifique pour le tarif
    if (currentQuestion.id === 'rate') {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0) {
        setError('Le tarif doit être un nombre positif');
        return;
      }
    }

    setFormData({
      ...formData,
      [currentQuestion.id]: value,
    });
    setError('');
  };

  const validateCurrentStep = () => {
    const currentQuestion = questions[currentStep];
    if (currentQuestion.required && !formData[currentQuestion.id as keyof FormData]) {
      setError('Ce champ est requis');
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    if (currentStep === questions.length - 1) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/generate-landing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la génération de la page');
        }

        const data = await response.json();
        setShowGreeting(true);
        // Handle success (e.g., redirect to the generated page)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
    setError('');
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Création de ta page pro
          </h2>
          <div className="text-gray-600 text-lg mb-8">
            {currentQuestion.emoji} {currentQuestion.label}
          </div>
        </div>

        <div className="mb-8">
          {currentQuestion.type === 'select' ? (
            <select
              value={formData[currentQuestion.id as keyof FormData] || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              <option value="">Sélectionnez une option</option>
              {currentQuestion.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : currentQuestion.type === 'textarea' ? (
            <textarea
              value={formData[currentQuestion.id as keyof FormData]}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
            />
          ) : (
            <input
              type={currentQuestion.type}
              value={formData[currentQuestion.id as keyof FormData]}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="flex justify-between items-center space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Création en cours...
              </div>
            ) : (
              currentStep === questions.length - 1 ? 'Terminer' : 'Suivant'
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 