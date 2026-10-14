import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCTA } from "@/components/StickyCTA";
import { ChatGate } from "@/components/ChatGate";
import { SiteContentProvider } from "@/lib/site-content";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VECTREV Engineering Solutions — Industrial T&C & Consulting | Tamil Nadu" },
      { name: "description", content: "Industrial electrical Testing & Commissioning, engineering consultancy and safety-compliant project execution. Trusted by plants and contractors across Tamil Nadu." },
      { name: "author", content: "VECTREV Engineering Solutions Pvt Ltd" },
      { property: "og:title", content: "VECTREV Engineering Solutions — Industrial T&C & Consulting | Tamil Nadu" },
      { property: "og:description", content: "Industrial electrical Testing & Commissioning, engineering consultancy and safety-compliant project execution. Trusted by plants and contractors across Tamil Nadu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "VECTREV Engineering Solutions — Industrial T&C & Consulting | Tamil Nadu" },
      { name: "twitter:description", content: "Industrial electrical Testing & Commissioning, engineering consultancy and safety-compliant project execution. Trusted by plants and contractors across Tamil Nadu." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ba60a7ff-f2cd-4870-a2d6-28706ef461a4/id-preview-9acbd3ea--e763c5d5-df6d-4f0c-8d02-ee49c6cc0c23.lovable.app-1779212006038.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ba60a7ff-f2cd-4870-a2d6-28706ef461a4/id-preview-9acbd3ea--e763c5d5-df6d-4f0c-8d02-ee49c6cc0c23.lovable.app-1779212006038.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdminArea = pathname.startsWith("/admin") || pathname === "/login";

  return (
    <QueryClientProvider client={queryClient}>
      <SiteContentProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          {!isAdminArea && <SiteHeader />}
          <main className="flex-1">
            <Outlet />
          </main>
          {!isAdminArea && <SiteFooter />}
          {!isAdminArea && <StickyCTA />}
          {!isAdminArea && <ChatGate />}
        </div>
      </SiteContentProvider>
    </QueryClientProvider>
  );
}
