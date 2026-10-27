"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUser(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!firstName || !lastName || !email || !password) {
    return { error: "All fields are required." }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return { error: "An account with this email already exists." }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
