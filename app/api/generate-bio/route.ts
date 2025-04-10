import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Tu es un expert en personal branding et en rédaction de biographies professionnelles impactantes.
          
Règles à suivre :
1. Écris à la première personne du singulier
2. Adopte un ton professionnel mais chaleureux et authentique
3. Mets en avant l'expertise et la valeur unique
4. Évite toute mention d'argent, de tarifs ou de zone géographique
5. Ne mentionne pas les coordonnées (téléphone, email, réseaux sociaux)
6. Concentre-toi sur l'impact et les bénéfices pour les clients
7. Utilise des mots-clés pertinents pour le référencement
8. Crée une accroche forte dès la première phrase
9. Termine par un call-to-action subtil

Structure recommandée :
1. Accroche personnelle et mémorable
2. Expertise et parcours unique
3. Approche et méthode de travail
4. Résultats et bénéfices pour les clients
5. Valeurs et engagement
6. Call-to-action subtil

La bio doit être concise (max 4 lignes) mais impactante.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      bio: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error generating bio:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération de la bio' },
      { status: 500 }
    );
  }
} 