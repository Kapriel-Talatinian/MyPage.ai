'use client'

import { Button } from '@/components/ui/button'

interface DeleteSiteButtonProps {
  siteId: string
}

export function DeleteSiteButton({ siteId }: DeleteSiteButtonProps) {
  const handleDelete = async () => {
    // TODO: Implémenter la logique de suppression
    console.log('Suppression du site:', siteId)
  }

  return (
    <Button 
      variant="secondary" 
      className="w-full h-10 bg-red-600 hover:bg-red-700 text-white text-base font-medium"
      onClick={handleDelete}
    >
      Supprimer
    </Button>
  )
} 