import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <SignUp
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
