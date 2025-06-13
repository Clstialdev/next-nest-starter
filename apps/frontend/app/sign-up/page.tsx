import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div
      className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url(/cosmic-zen.png)" }}
    >
      <div className="absolute inset-0 backdrop-blur-xl bg-black/20 grayscale-[.90]"></div>
      <div className="w-full max-w-sm md:max-w-3xl relative z-10">
        <SignUpForm />
      </div>
    </div>
  );
}
