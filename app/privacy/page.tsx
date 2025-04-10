'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Politique de confidentialité</h1>
          
          <div className="prose prose-lg">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Collecte des données</h2>
              <p className="mb-4">
                Nous collectons uniquement les données nécessaires au bon fonctionnement de votre site web et du système de réservation :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Informations de contact (nom, email, téléphone)</li>
                <li>Informations professionnelles (type d'activité, services)</li>
                <li>Préférences de personnalisation du site</li>
                <li>Données de réservation de vos clients</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Utilisation des données</h2>
              <p className="mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Créer et gérer votre site web professionnel</li>
                <li>Gérer les réservations de vos clients</li>
                <li>Vous fournir un support technique</li>
                <li>Améliorer nos services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Protection des données</h2>
              <p className="mb-4">
                Nous mettons en œuvre des mesures de sécurité pour protéger vos données :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Chiffrement SSL/TLS</li>
                <li>Stockage sécurisé des données</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Sauvegardes régulières</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Vos droits</h2>
              <p className="mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
              <p className="mb-4">
                Nous utilisons des cookies essentiels pour :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Maintenir votre session</li>
                <li>Mémoriser vos préférences</li>
                <li>Assurer la sécurité du site</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Partage des données</h2>
              <p className="mb-4">
                Nous ne partageons jamais vos données avec des tiers sans votre consentement explicite, sauf :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Si requis par la loi</li>
                <li>Pour protéger nos droits légaux</li>
                <li>En cas d'urgence impliquant la sécurité personnelle</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Conservation des données</h2>
              <p className="mb-4">
                Nous conservons vos données tant que votre compte est actif ou nécessaire pour vous fournir nos services. Vous pouvez demander la suppression de vos données à tout moment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
              <p className="mb-4">
                Pour toute question concernant vos données personnelles, contactez notre délégué à la protection des données à privacy@mypage.ai
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 