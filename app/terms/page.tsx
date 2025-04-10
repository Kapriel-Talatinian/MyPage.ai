'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Conditions d'utilisation</h1>
          
          <div className="prose prose-lg">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptation des conditions</h2>
              <p className="mb-4">
                En accédant et en utilisant MyPage.ai, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect des lois locales applicables.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Licence d'utilisation</h2>
              <p className="mb-4">
                MyPage.ai vous accorde une licence limitée, non exclusive et non transférable pour utiliser la plateforme conformément à ces conditions.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Vous ne pouvez pas modifier ou copier les matériaux</li>
                <li>Vous ne pouvez pas utiliser les matériaux à des fins commerciales</li>
                <li>Vous ne pouvez pas transférer les matériaux à une autre personne</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Tarification et paiement</h2>
              <p className="mb-4">
                Le service est proposé pour un paiement unique de 19.99€. Ce paiement inclut :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Création de votre site web professionnel</li>
                <li>Système de réservation intégré</li>
                <li>Support technique</li>
                <li>Mises à jour de sécurité</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Propriété intellectuelle</h2>
              <p className="mb-4">
                Le contenu généré par l'utilisateur reste sa propriété. MyPage.ai conserve les droits sur la plateforme et ses fonctionnalités.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Protection des données</h2>
              <p className="mb-4">
                Nous nous engageons à protéger vos données personnelles conformément au RGPD. Pour plus d'informations, consultez notre politique de confidentialité.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Limitation de responsabilité</h2>
              <p className="mb-4">
                MyPage.ai ne peut être tenu responsable des pertes directes ou indirectes résultant de l'utilisation de la plateforme.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Modifications des conditions</h2>
              <p className="mb-4">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
              <p className="mb-4">
                Pour toute question concernant ces conditions, contactez-nous à support@mypage.ai
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 