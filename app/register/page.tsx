"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/app/actions/register"

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
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Create an Account</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block" }}>First Name</label>
          <input name="firstName" type="text" required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div>
          <label style={{ display: "block" }}>Last Name</label>
          <input name="lastName" type="text" required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div>
          <label style={{ display: "block" }}>Email</label>
          <input name="email" type="email" required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div>
          <label style={{ display: "block" }}>Password</label>
          <input name="password" type="password" required style={{ width: "100%", padding: "8px" }} />
        </div>
        
        <button type="submit" disabled={loading} style={{ padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", cursor: "pointer" }}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  )
}
