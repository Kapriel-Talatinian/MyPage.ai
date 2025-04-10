import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Read the template file
    const templatePath = path.join(process.cwd(), 'app', 'api', 'generate-landing', 'template.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    // Format certifications as an array if it exists
    const certifications = data.certifications ? data.certifications.split(',').map((cert: string) => cert.trim()) : [];

    // Replace variables in the template
    template = template
      .replace(/\{\{\s*name\s*\}\}/g, data.name || '')
      .replace(/\{\{\s*profession\s*\}\}/g, data.profession || '')
      .replace(/\{\{\s*bio\s*\}\}/g, data.bio || '')
      .replace(/\{\{\s*rate\s*\}\}/g, data.rate || '')
      .replace(/\{\{\s*availability\s*\}\}/g, data.availability || '')
      .replace(/\{\{\s*location\s*\}\}/g, data.location || '')
      .replace(/\{\{\s*phone\s*\}\}/g, data.phone || '')
      .replace(/\{\{\s*email\s*\}\}/g, data.email || '')
      .replace(/\{\{\s*stripe_key\s*\}\}/g, process.env.STRIPE_KEY || '');

    // Handle certifications section
    if (certifications.length > 0) {
      const certificationsList = certifications
        .map((cert: string) => `
          <div class="badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 4.577v6.846L8 15 2 11.423V4.577L8 1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z"/>
              <path d="M4 6h8v1H4V6zm0 2h8v1H4V8zm0 2h4v1H4v-1z"/>
            </svg>
            ${cert}
          </div>
        `)
        .join('');

      template = template.replace(
        /\{%\s*if\s*certifications\s*%\}([\s\S]*?)\{%\s*endif\s*%\}/g,
        `<div class="badge-list">${certificationsList}</div>`
      );
    } else {
      // Remove the entire certifications section if there are no certifications
      template = template.replace(
        /\{%\s*if\s*certifications\s*%\}[\s\S]*?\{%\s*endif\s*%\}/g,
        ''
      );
    }

    return NextResponse.json({ html: template });
  } catch (error) {
    console.error('Error generating landing page:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération de la page' },
      { status: 500 }
    );
  }
} 