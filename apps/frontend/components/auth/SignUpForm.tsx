"use client";
import Image from "next/image";
import type React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignUpFormProps extends React.ComponentProps<"div"> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [error, setError] = useState<string | null>(null);

  async function signup({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (res.status === 201) {
        const data = await res.json();
        return { status: "OK", message: "Signup successful" };
      } else {
        const data = await res.json();
        return { status: "KO", message: data.message };
      }
    } catch (error) {
      return { status: "KO", message: "An error occurred during signup" };
    }
  }

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      if (value.password !== value.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const result = await signup({
        email: value.email,
        name: value.fullname,
        password: value.password,
      });

      if (result.status === "KO") {
        setError(result.message);
      } else {
        setError(null);
        router.push("/login");
      }
    },
    validators: {
      onSubmit: z
        .object({
          email: z.string().email(),
          fullname: z.string().min(2),
          password: z.string().min(8),
          confirmPassword: z.string().min(8),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords must match",
          path: ["confirmPassword"],
        }),
    },
  });

  return (
    <div className={`flex flex-col gap-6 ${className || ""}`} {...props}>
      <div className="overflow-hidden rounded-lg shadow-2xl">
        <div className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="p-6 md:p-8 backdrop-blur-xl bg-[#FEDFB1]/20 border border-[#FEDFB1]/30 shadow-2xl rounded-l-lg"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-white">
                  Create an account
                </h1>
                <p className="text-balance text-gray-200">
                  Sign up for your Zenn stack account
                </p>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Full Name Field */}
              <form.Field
                name="fullname"
                validators={{
                  onChange: z.string().min(1, "Full Name is required"),
                }}
                children={(field) => (
                  <div className="grid gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-medium text-white"
                    >
                      Full Name
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="John Doe"
                      className="flex h-10 w-full rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    />
                    {field.state.meta.errors && (
                      <em className="text-sm text-red-400">
                        {field.state.meta.errors
                          .map((e) => e?.message)
                          .join(", ")}
                      </em>
                    )}
                  </div>
                )}
              />

              {/* Email Field */}
              <form.Field
                name="email"
                validators={{
                  onChange: z
                    .string()
                    .min(1, "Email is required")
                    .email("Must be a valid email"),
                }}
                children={(field) => (
                  <div className="grid gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-medium text-white"
                    >
                      Email
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="m@example.com"
                      className="flex h-10 w-full rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    />
                    {field.state.meta.errors && (
                      <em className="text-sm text-red-400">
                        {field.state.meta.errors
                          .map((e) => e?.message)
                          .join(", ")}
                      </em>
                    )}
                  </div>
                )}
              />

              {/* Password Field */}
              <form.Field
                name="password"
                validators={{
                  onChange: z
                    .string()
                    .min(8, "Password must be at least 8 characters"),
                }}
                children={(field) => (
                  <div className="grid gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-medium text-white"
                    >
                      Password
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    />
                    {field.state.meta.errors && (
                      <em className="text-sm text-red-400">
                        {field.state.meta.errors
                          .map((e) => e?.message)
                          .join(", ")}
                      </em>
                    )}
                  </div>
                )}
              />

              {/* Confirm Password Field */}
              <form.Field
                name="confirmPassword"
                validators={{
                  onChange: z.string().min(8, "Please confirm your password"),
                }}
                children={(field) => (
                  <div className="grid gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-medium text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    />
                    {field.state.meta.errors && (
                      <em className="text-sm text-red-400">
                        {field.state.meta.errors
                          .map((e) => e?.message)
                          .join(", ")}
                      </em>
                    )}
                  </div>
                )}
              />

              {/* Submit Button */}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full h-10 px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Signing up..." : "Sign up"}
                  </button>
                )}
              />

              <div className="text-center text-sm text-gray-200">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-white underline underline-offset-4 hover:text-gray-200"
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>

          <div className="relative hidden md:block overflow-hidden bg-[#453027]">
            <Image
              src="/zen_waves.png"
              width={256}
              height={256}
              alt="Cosmic background with black hole"
              className="absolute inset-0 object-cover w-full"
            />
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-300">
        By signing up, you agree to our{" "}
        <Link href="#" className="text-white underline hover:text-gray-200">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-white underline hover:text-gray-200">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
