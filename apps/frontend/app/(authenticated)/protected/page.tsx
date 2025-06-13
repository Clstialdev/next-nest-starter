"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { logout } = useAuthStore();
  const { user } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#1a1a1a] bg-[url('/zen_waves.png')] bg-blend-overlay bg-cover bg-center">
      <div className="w-full max-w-md overflow-hidden rounded-lg shadow-2xl">
        <div className="p-8 backdrop-blur-xl bg-[#FEDFB1]/20 border border-[#FEDFB1]/30 shadow-2xl rounded-lg">
          <div className="flex flex-col gap-6 text-center">
            <div className="flex justify-center">
              <Shield className="w-16 h-16" />
            </div>
            <h1 className="text-3xl font-bold text-white">Access Granted</h1>
            <p className="text-balance text-gray-200">
              Welcome back,{" "}
              <span className="font-semibold text-white">{user?.name}</span>.
              You have successfully authenticated.
            </p>
            <div className="border-t border-white/20 my-2"></div>
            <p className="text-sm text-gray-300">
              This is a protected area of the application, only accessible to
              logged-in users.
            </p>
            <button
              onClick={handleLogout}
              className="w-full h-10 px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
