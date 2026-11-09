import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Using JSON Web Tokens for fast session lookups
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password")
        }

        // Find user by email via your Prisma singleton
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error("No user found with this email")
        }

        // Verify password hash match
        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error("Incorrect password")
        }

        return user
      }
    })
    // You can easily append GoogleProvider or GitHubProvider arrays right here later!
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: "/login", // Points to your custom Next.js login page
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
