'use client'

import { Button } from '@/components/ui/button'
import { QrCode } from 'lucide-react'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

interface AddToWalletButtonProps {
  siteUrl: string
}

export function AddToWalletButton({ siteUrl }: AddToWalletButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const fullUrl = `https://${siteUrl}.com`

  const handleAddToWallet = async () => {
    try {
      // Générer le QR code
      const qrCodeData = `https://${siteUrl}.com`
      
      // Créer le fichier .pkpass
      const passData = {
        formatVersion: 1,
        teamIdentifier: "YOUR_TEAM_ID",
        passTypeIdentifier: "pass.com.yourdomain.wallet",
        serialNumber: "123456",
        webServiceURL: "https://example.com/passes/",
        authenticationToken: "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc",
        locations: [],
        barcode: {
          message: qrCodeData,
          format: "PKBarcodeFormatQR",
          messageEncoding: "iso-8859-1"
        },
        organizationName: "Votre Organisation",
        description: "Carte de site web",
        logoText: "Votre Site",
        foregroundColor: "rgb(255, 255, 255)",
        backgroundColor: "rgb(60, 65, 73)",
        labelColor: "rgb(255, 255, 255)",
        storeCard: {
          headerFields: [],
          primaryFields: [],
          secondaryFields: [],
          auxiliaryFields: [],
          backFields: []
        }
      }

      // Convertir en JSON et créer le fichier
      const passJson = JSON.stringify(passData)
      const blob = new Blob([passJson], { type: 'application/vnd.apple.pkpass' })
      const url = URL.createObjectURL(blob)
      
      // Télécharger le fichier
      const a = document.createElement('a')
      a.href = url
      a.download = `${siteUrl}.pkpass`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erreur lors de la génération de la carte:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          className="w-full h-10 flex items-center justify-center gap-2 text-base"
        >
          <QrCode className="h-5 w-5" />
          <span className="whitespace-nowrap">Apple Wallet</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Ajouter à Apple Wallet</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-6">
          <div className="w-full max-w-[250px] mx-auto bg-white p-4 rounded-lg shadow-md">
            <QRCodeSVG 
              value={fullUrl}
              size={250}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-base text-gray-600 text-center px-4">
            Scannez le QR code avec votre appareil pour accéder au site
          </p>
          <Button 
            onClick={handleAddToWallet} 
            className="w-full max-w-sm h-11 text-base font-medium"
          >
            Télécharger la carte Apple Wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 