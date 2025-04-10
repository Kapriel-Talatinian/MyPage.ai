import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditSitePage({ params }: PageProps) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Exemple de données (à remplacer par vos données réelles)
  const site = {
    id: params.id,
    name: 'Mon Site de Coaching',
    url: 'monsite-coaching',
    description: 'Site de coaching sportif et bien-être',
    template: 'Template 1'
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Modifier le site</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom du site
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={site.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                URL personnalisée
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  https://
                </span>
                <input
                  type="text"
                  id="url"
                  name="url"
                  defaultValue={site.url}
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={site.description}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="template" className="block text-sm font-medium text-gray-700">
                Template
              </label>
              <select
                id="template"
                name="template"
                defaultValue={site.template}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>Template 1</option>
                <option>Template 2</option>
                <option>Template 3</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => window.location.href = '/dashboard/sites'}
              >
                Annuler
              </Button>
              <Button type="submit">
                Enregistrer les modifications
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 