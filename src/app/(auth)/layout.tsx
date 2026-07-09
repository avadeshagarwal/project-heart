import Link from "next/link"
import { SITE_CONFIG, ROUTES } from "@/lib/constants"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8 flex items-center justify-between">
            <Link href={ROUTES.home} className="font-serif text-2xl font-bold tracking-tighter text-primary">
              {SITE_CONFIG.name}
            </Link>
          </div>
          {children}
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block bg-muted">
        <div className="absolute inset-0 h-full w-full object-cover flex items-center justify-center p-12">
          <div className="max-w-2xl text-center space-y-4">
             <h2 className="text-4xl font-serif font-semibold text-foreground">
                Your memories, beautifully preserved.
             </h2>
             <p className="text-lg text-muted-foreground">
                Join thousands of others who are turning their digital moments into unforgettable experiences.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}
