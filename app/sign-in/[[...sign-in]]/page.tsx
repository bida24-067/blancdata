import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <SignIn
        fallbackRedirectUrl="/admin"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'bg-[#181818] border border-white/[0.1] shadow-2xl text-white',
          },
        }}
      />
    </div>
  )
}
