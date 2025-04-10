'use client'

import { motion } from 'framer-motion'

const faqs = [
  {
    question: "Comment fonctionne MyPage.ai ?",
    answer: "MyPage.ai utilise l'intelligence artificielle pour vous aider à créer un site web professionnel en quelques minutes. Il vous suffit de répondre à quelques questions et notre IA génère un site adapté à vos besoins."
  },
  {
    question: "Y a-t-il des frais cachés ?",
    answer: "Non, vous payez uniquement 19,99€ TTC par site. Tout est inclus dans ce prix unique : hébergement, nom de domaine, certificat SSL, support client, etc."
  },
  {
    question: "Combien de temps ai-je accès au site ?",
    answer: "À vie ! Une fois payé, votre site reste accessible sans limitation de durée. Vous pouvez le modifier quand vous voulez."
  },
  {
    question: "Puis-je personnaliser mon site ?",
    answer: "Oui, vous avez un contrôle total sur l'apparence de votre site. Vous pouvez modifier les couleurs, les polices, les images et le contenu à volonté."
  },
  {
    question: "Le nom de domaine est-il vraiment inclus ?",
    answer: "Oui, un nom de domaine personnalisé est inclus dans le prix (extension .com, .fr, .net au choix selon disponibilité)."
  },
  {
    question: "Comment fonctionne le support client ?",
    answer: "Notre équipe support est disponible 24/7 par chat et email pour vous aider dans la création et la gestion de votre site."
  },
  {
    question: "Puis-je exporter mes données ?",
    answer: "Oui, vous pouvez exporter toutes vos données à tout moment au format de votre choix."
  },
  {
    question: "Mon site sera-t-il référencé sur Google ?",
    answer: "Oui, tous nos sites sont optimisés pour le référencement (SEO) et respectent les bonnes pratiques pour être bien positionnés sur Google."
  }
]

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center"
          >
            Questions fréquentes
          </motion.h1>
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
          <a
            href="/contact"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Contactez-nous
          </a>
        </motion.div>
      </div>
    </div>
  )
} 