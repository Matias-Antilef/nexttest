import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex bg-slate-600 px-40 justify-between py-4 sticky top-0 z-50 text-white">
      <h1 className="text-orange-400 font-semibold">Next app</h1>
      <ul className="flex gap-x-5">
        {session?.user ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>{" "}
            </li>
            <li>
              <Link
                href="/api/auth/signout"
                className="bg-red-500 px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/auth/login">Login</Link>{" "}
            </li>
            <li>
              <Link href="/auth/register">Register</Link>{" "}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;
