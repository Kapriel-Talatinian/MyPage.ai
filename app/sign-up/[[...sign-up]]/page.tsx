'use client';

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from 'next/navigation';
import { dark } from '@clerk/themes';

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Créez votre compte
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Et commencez à multiplier vos réservations
          </p>
        </div>
        
        <SignUp 
          appearance={{
            baseTheme: dark,
            elements: {
              formButtonPrimary: 
                "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case",
              card: "bg-white shadow-xl rounded-xl",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: 
                "border border-gray-300 hover:border-gray-400",
              formFieldInput: 
                "rounded-md border-gray-300 focus:border-indigo-500",
              footerActionLink: 
                "text-indigo-600 hover:text-indigo-700"
            },
          }}
          redirectUrl={redirect}
          routing="path"
          path="/sign-up"
        />
      </div>
    </div>
  );
} 