import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AddToWalletButton } from '../../components/AddToWalletButton'

export default async function SitesPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Exemple de données (à remplacer par vos données réelles)
  const sites = [
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
      name: 'Mon Blog Personnel',
      url: 'mon-blog',
      description: 'Blog sur le développement personnel',
      createdAt: '2024-03-10',
      template: 'Template 2'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Mes Sites</h1>
          <Link href="/dashboard/sites/new">
            <Button className="px-6 py-2 text-base">
              Créer un nouveau site
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sites.map((site) => (
            <div key={site.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 p-6">
              <h2 className="text-xl font-semibold mb-3">{site.name}</h2>
              <p className="text-gray-600 mb-4 min-h-[48px]">{site.description}</p>
              <div className="text-sm text-gray-500 mb-6 space-y-1">
                <p className="flex items-center">
                  <span className="font-medium w-20">URL:</span> 
                  {site.url}
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-20">Template:</span> 
                  {site.template}
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-20">Créé le:</span> 
                  {site.createdAt}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href={`/dashboard/sites/${site.id}/edit`} className="w-full">
                  <Button variant="secondary" className="w-full h-10 text-base">
                    Modifier
                  </Button>
                </Link>
                <AddToWalletButton siteUrl={site.url} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 