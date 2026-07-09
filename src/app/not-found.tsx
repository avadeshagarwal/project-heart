import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-6 text-center px-4">
      <div className="space-y-2">
        <h1 className="text-8xl font-bold tracking-tighter text-primary">404</h1>
        <h2 className="text-3xl font-semibold tracking-tight">Page not found</h2>
      </div>
      <p className="max-w-[600px] text-muted-foreground">
        The page you are looking for doesn't exist, has been moved, or the link has expired.
      </p>
      <Link
        href={ROUTES.home}
        className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Return to Home
      </Link>
    </div>
  );
}
