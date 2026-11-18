
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex w-full flex-1 items-center justify-center px-4 py-10 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/60 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl">
        <h1 className="mb-2 text-3xl font-semibold text-gray-900">Welcome Home</h1>

        <p className="mb-8 text-sm text-gray-600">
          Sign in to access your household.
        </p>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50/80 p-4 backdrop-blur-sm border border-red-200/50">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-gray-200/50 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500/50 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-gray-200/50 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500/50 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-medium text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
