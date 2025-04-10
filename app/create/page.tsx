'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@clerk/nextjs';

const steps = [
  {
    id: 'type',
    title: 'Type d\'activité',
    question: 'Quel type de service proposez-vous ?',
    options: [
      'Coach bien-être',
      'Thérapeute',
      'Consultant',
      'Coach sportif',
      'Photographe',
      'Autre'
    ]
  },
  {
    id: 'services',
    title: 'Vos services',
    question: 'Quels sont vos principaux services ?',
    type: 'text',
    placeholder: 'Ex: Coaching personnel, Séances de groupe...'
  },
  {
    id: 'pricing',
    title: 'Tarification',
    question: 'Quels sont vos tarifs ?',
    type: 'text',
    placeholder: 'Ex: 60€/heure, Pack 5 séances 250€...'
  },
  {
    id: 'availability',
    title: 'Disponibilités',
    question: 'Quels sont vos horaires de disponibilité ?',
    type: 'text',
    placeholder: 'Ex: Lundi-Vendredi 9h-18h...'
  },
  {
    id: 'style',
    title: 'Style visuel',
    question: 'Quel style souhaitez-vous pour votre site ?',
    options: [
      'Professionnel et moderne',
      'Chaleureux et accueillant',
      'Minimaliste et épuré',
      'Dynamique et énergique'
    ]
  }
];

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [steps[currentStep].id]: answer });
    
    if (currentStep === steps.length - 1) {
      if (!isSignedIn) {
        router.push('/sign-up?redirect=/payment');
      } else {
        router.push('/payment');
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-xl shadow-xl p-8"
        >
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
              <span className="text-sm text-gray-500">
                Étape {currentStep + 1} sur {steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-xl mb-6">{steps[currentStep].question}</h3>

          {steps[currentStep].options ? (
            <div className="grid grid-cols-1 gap-4">
              {steps[currentStep].options.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  className="justify-start h-auto py-4 px-6 text-left"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {steps[currentStep].type === 'text' ? (
                <Textarea
                  placeholder={steps[currentStep].placeholder}
                  className="w-full"
                  rows={4}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAnswer(e.target.value);
                    }
                  }}
                />
              ) : (
                <Input
                  type="text"
                  placeholder={steps[currentStep].placeholder}
                  className="w-full"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAnswer(e.target.value);
                    }
                  }}
                />
              )}
              <Button
                className="w-full"
                onClick={(e) => {
                  const input = e.target.previousElementSibling;
                  handleAnswer(input.value);
                }}
              >
                Continuer
              </Button>
            </div>
          )}

          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Retour
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
} 