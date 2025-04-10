import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Exemple de données de sites (à remplacer par vos données réelles)
  const recentSites = [
    {
      id: '1',
      name: 'Mon Site de Coaching',
      url: 'monsite-coaching',
      description: 'Site de coaching sportif et bien-être',
      createdAt: '2024-03-15',
      template: 'Template 1'
    },
    {
      id: '2',
      name: 'Cabinet de Thérapie',
      url: 'cabinet-therapie',
      description: 'Cabinet de thérapie et consultation',
      createdAt: '2024-03-10',
      template: 'Template 2'
    }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <Button onClick={() => window.location.href = '/dashboard/sites/new'}>
          Créer un nouveau site
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Activités récentes</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentSites.map((site) => (
            <div key={site.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{site.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{site.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>URL: {site.url}</span>
                    <span className="mx-2">•</span>
                    <span>Template: {site.template}</span>
                    <span className="mx-2">•</span>
                    <span>Créé le: {new Date(site.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/dashboard/sites/${site.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 