'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Le numéro de téléphone doit contenir au moins 10 caractères'),
  businessType: z.string().min(1, 'Veuillez sélectionner un type d\'activité'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  budget: z.string().min(1, 'Veuillez sélectionner un budget'),
  timeline: z.string().min(1, 'Veuillez sélectionner un délai'),
  features: z.array(z.string()).min(1, 'Veuillez sélectionner au moins une fonctionnalité'),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions d\'utilisation'
  })
})

type FormData = z.infer<typeof formSchema>

const steps = [
  {
    id: 'welcome',
    title: 'Bienvenue',
    description: 'Commençons par créer votre site web professionnel'
  },
  {
    id: 'contact',
    title: 'Informations de contact',
    fields: ['name', 'email', 'phone']
  },
  {
    id: 'business',
    title: 'Votre activité',
    fields: ['businessType', 'description']
  },
  {
    id: 'project',
    title: 'Votre projet',
    fields: ['budget', 'timeline', 'features']
  },
  {
    id: 'terms',
    title: 'Conditions d\'utilisation',
    fields: ['acceptTerms']
  }
]

const features = [
  {
    title: 'Création Intuitive',
    description: 'Créez votre site de réservation en 5 minutes sans code. Augmentez vos réservations de 300% grâce à notre système conversationnel.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  {
    title: 'Roadmap Claire',
    description: 'Suivez votre progression étape par étape : création du site, personnalisation, intégration du système de réservation, et lancement en 24h.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    title: 'Optimisation Conversion',
    description: 'Multipliez vos clients par 3 grâce à notre système de réservation conversationnel qui guide vos prospects vers l\'achat.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  }
]

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Coach Bien-être',
    content: 'Mon agenda est maintenant rempli à 90% grâce au système de réservation. Mes revenus ont augmenté de 250% en 2 mois ! Une solution vraiment efficace.',
    avatar: '/avatars/avatar-1.jpg'
  },
  {
    name: 'Thomas Dubois',
    role: 'Consultant Indépendant',
    content: 'Je gagne 4h par jour grâce à l\'automatisation des réservations. Mes clients adorent la simplicité du système. Un gain de temps précieux.',
    avatar: '/avatars/avatar-2.jpg'
  },
  {
    name: 'Marie Laurent',
    role: 'Thérapeute',
    content: 'Le nombre de mes consultations a triplé depuis que j\'utilise ce système. La meilleure décision pour mon cabinet ! Un outil indispensable.',
    avatar: '/avatars/avatar-3.jpg'
  },
  {
    name: 'Lucas Bernard',
    role: 'Coach Sportif',
    content: 'Fini les agendas papier et les appels manqués. Mes créneaux se remplissent automatiquement 24h/24. Une solution parfaite pour mon activité.',
    avatar: '/avatars/avatar-4.jpg'
  },
  {
    name: 'Emma Petit',
    role: 'Photographe',
    content: 'La prise de rendez-vous est devenue un jeu d\'enfant. Mes revenus ont augmenté de 180% en 3 mois. Un outil vraiment révolutionnaire.',
    avatar: '/avatars/avatar-5.jpg'
  }
]

const LandingPage = () => {
  const router = useRouter()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change toutes les 5 secondes

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f2f2f2] p-4 pt-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
          <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:30px_30px]" />
          <div className="container relative">
            <div className="flex flex-col lg:flex-row items-center justify-between pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
              >
                <h1 className="text-5xl font-bold mb-6">
                  Multipliez vos clients par{' '}
                  <span className="gradient-text">3x</span> avec votre site de réservation
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Créez votre site web professionnel avec système de réservation intégré. Idéal pour les coachs, thérapeutes et consultants qui veulent automatiser leur prise de rendez-vous.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => router.push('/create')}
                  >
                    Commencer gratuitement
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => router.push('/features')}
                  >
                    Voir les fonctionnalités
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:w-1/2"
              >
                <Image
                  src="/hero-image.png"
                  alt="Site de réservation"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Votre parcours vers le succès</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une solution complète pour automatiser votre activité et augmenter vos revenus
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <div className="text-indigo-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Ils nous font confiance</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez les témoignages de nos clients satisfaits
              </p>
            </motion.div>

            <div className="relative overflow-hidden">
              <motion.div
                className="flex"
                animate={{
                  x: [0, -1000],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear"
                  }
                }}
              >
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-[400px] flex-shrink-0 px-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl shadow-lg p-8"
                    >
                      <div className="flex items-center mb-4">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="ml-4">
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{testimonial.content}</p>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LandingPage 