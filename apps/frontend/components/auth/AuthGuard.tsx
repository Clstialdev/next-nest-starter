"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // If the initial auth check is still loading, do nothing yet.
    if (isLoading) {
      return;
    }

    // If the check is complete and the user is not authenticated,
    // redirect them to the login page.
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // While loading, you can show a global loading spinner or a blank screen.
  if (isLoading) {
    return <div>Loading session...</div>;
  }

  // If authenticated, allow the child components (the protected layout and pages) to render.
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated, render null while the redirect happens.
  return null;
}
