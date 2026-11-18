
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full p-4">
      <div className="w-full h-full flex flex-row items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          Home
        </Link>

        <div className="h-full flex flex-row items-center justify-end gap-4">
          {session ? (
            <LogoutButton />
          ) : (
            <>
              <Link href="/login" className="text-sm text-white">
                Login
              </Link>

              <Link href="/register" className="text-sm text-white">
                Register
              </Link>
            </>
          )}

          <FiMenu color="#878787" size={24} />
        </div>
      </div>
    </nav>
  );
}
