"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/app/actions/register"
import Link from "next/link"

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await registerUser(formData)

    setLoading(false)

    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      // Successfully registered! Send them to the login screen
      router.push("/login")
    }
  }

  return (
    <main className="flex w-full flex-1 items-center justify-center px-4 py-10 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/60 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl">
        <h1 className="mb-2 text-3xl font-semibold text-gray-900">Create Account</h1>

        <p className="mb-8 text-sm text-gray-600">
          Join your household today.
        </p>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50/80 p-4 backdrop-blur-sm border border-red-200/50">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              className="w-full rounded-xl border border-gray-200/50 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500/50 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
              placeholder="John"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              className="w-full rounded-xl border border-gray-200/50 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500/50 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
              placeholder="Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
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
              name="password"
              type="password"
              required
              autoComplete="new-password"
              className="w-full rounded-xl border border-gray-200/50 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500/50 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-medium text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  )
}
