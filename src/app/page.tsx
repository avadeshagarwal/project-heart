import Link from "next/link";
import { SITE_CONFIG, ROUTES } from "@/lib/constants";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 lg:p-24 bg-background relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 -translate-y-12 right-0 translate-x-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 translate-y-1/3 left-0 -translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="z-10 flex flex-col items-center text-center max-w-3xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground font-serif">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-[600px] mx-auto leading-relaxed">
            {SITE_CONFIG.description}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto">
          <Link
            href={ROUTES.signup}
            className="flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25 transition-all active:scale-95"
          >
            Start Creating
          </Link>
          <Link
            href={ROUTES.login}
            className="flex h-12 items-center justify-center rounded-full bg-secondary px-8 text-sm font-medium text-foreground hover:bg-muted border border-muted transition-all active:scale-95"
          >
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}
