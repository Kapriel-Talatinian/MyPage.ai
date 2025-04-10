'use client'

import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const performanceData = [
  { month: 'Jan', value: 30 },
  { month: 'Fév', value: 45 },
  { month: 'Mar', value: 75 },
  { month: 'Avr', value: 100 },
];

const conversionData = [
  { name: 'Sans MyPage.ai', value: 30 },
  { name: 'Avec MyPage.ai', value: 90 },
];

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

const roadmapSteps = [
  {
    title: 'Création du site',
    description: 'Répondez à quelques questions simples pour générer votre site',
    duration: '5 minutes',
    icon: '🎨'
  },
  {
    title: 'Personnalisation',
    description: 'Ajustez les couleurs, textes et images selon vos besoins',
    duration: '10 minutes',
    icon: '✨'
  },
  {
    title: 'Configuration des services',
    description: 'Définissez vos services et leurs tarifs',
    duration: '15 minutes',
    icon: '⚙️'
  },
  {
    title: 'Système de réservation',
    description: 'Configurez vos disponibilités et modes de paiement',
    duration: '10 minutes',
    icon: '📅'
  },
  {
    title: 'Test et validation',
    description: 'Vérifiez que tout fonctionne parfaitement',
    duration: '5 minutes',
    icon: '✅'
  },
  {
    title: 'Mise en ligne',
    description: 'Votre site est prêt à recevoir vos premiers clients',
    duration: 'Instantané',
    icon: '🚀'
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6">
            Une solution complète pour votre activité
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment MyPage.ai transforme votre présence en ligne et automatise vos réservations
          </p>
        </motion.div>
      </section>

      {/* Performance Metrics */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Impact sur votre activité</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Croissance des réservations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4">Croissance des réservations</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-600 mt-4">Augmentation moyenne de 300% des réservations</p>
            </motion.div>

            {/* Taux de conversion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4">Taux de conversion</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conversionData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {conversionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-600 mt-4">Triplez votre taux de conversion</p>
            </motion.div>

            {/* Temps gagné */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4">Temps gagné par semaine</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Avant', hours: 15 },
                    { name: 'Après', hours: 2 }
                  ]}>
                    <Bar dataKey="hours" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-600 mt-4">Gagnez jusqu'à 13h par semaine</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Votre parcours vers le succès</h2>
          <div className="max-w-4xl mx-auto">
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start mb-12 relative"
              >
                <div className="flex-none w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-1">{step.description}</p>
                  <span className="text-indigo-600 font-medium">{step.duration}</span>
                </div>
                {index < roadmapSteps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-indigo-100" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 