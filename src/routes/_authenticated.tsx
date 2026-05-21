import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthPageShell } from "@/client/features/auth/AuthPage";
import { useSession } from "@/lib/auth-client";
import { isHostedClientAuthMode } from "@/lib/auth-mode";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedShellLayout,
});

function AuthenticatedShellLayout() {
  if (!isHostedClientAuthMode()) {
    return (
      <AuthPageShell>
        <Outlet />
      </AuthPageShell>
    );
  }

  return <HostedAuthenticatedShellLayout />;
}

function HostedAuthenticatedShellLayout() {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session?.user?.id) {
      void navigate({
        to: "/sign-in",
        search: {
          redirect: `${window.location.pathname}${window.location.search}`,
        },
      });
    }
  }, [isPending, session?.user?.id, navigate]);

  if (isPending || !session?.user?.id) {
    return null;
  }

  return (
    <AuthPageShell>
      <Outlet />
    </AuthPageShell>
  );
}
