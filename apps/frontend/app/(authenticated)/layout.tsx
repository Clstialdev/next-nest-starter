import AuthGuard from "@/components/auth/AuthGuard";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthGuard>{children}</AuthGuard>
    </div>
  );
}
