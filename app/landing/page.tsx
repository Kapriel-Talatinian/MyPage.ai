'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LandingData {
  html: string;
}

export default function LandingPage() {
  const [html, setHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('landingData');
    console.log('Retrieved data from localStorage:', data);

    if (!data) {
      console.log('No data found in localStorage');
      router.push('/');
      return;
    }

    try {
      const parsedData = JSON.parse(data) as LandingData;
      console.log('Parsed data:', parsedData);
      
      if (!parsedData.html) {
        console.log('No HTML content in parsed data');
        router.push('/');
        return;
      }

      // Create a temporary container
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = parsedData.html;

      // Remove any existing scripts
      const scripts = tempDiv.getElementsByTagName('script');
      Array.from(scripts).forEach(script => script.remove());

      // Extract and process the content
      const content = tempDiv.innerHTML;
      
      // Set the content
      setHtml(content);
      setIsLoading(false);

      // Apply the styles directly to prevent them from being overridden
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        body {
          margin: 0;
          padding: 0;
          background-color: #ffffff;
        }
        .landing-page-container {
          min-height: 100vh;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        .landing-page-container img {
          max-width: 100%;
          height: auto;
        }
        .landing-page-container section {
          margin-bottom: 2rem;
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
        .landing-page-container .hero {
          background: linear-gradient(to right, #4F46E5, #7C3AED);
          color: white;
          padding: 4rem 2rem;
          border-radius: 1rem;
          margin-bottom: 2rem;
          text-align: center;
          opacity: 1 !important;
          transform: none !important;
        }
        .landing-page-container h1,
        .landing-page-container h2,
        .landing-page-container p,
        .landing-page-container div {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
        .landing-page-container .contact-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }
        @media (max-width: 768px) {
          .landing-page-container {
            padding: 1rem;
          }
        }
      `;
      document.head.appendChild(styleSheet);
    } catch (error) {
      console.error('Error parsing landing data:', error);
      router.push('/');
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement de votre page...</p>
      </div>
    );
  }

  if (!html) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Veuillez d'abord générer votre page de profil.</p>
      </div>
    );
  }

  return (
    <div className="landing-page-container">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
} 