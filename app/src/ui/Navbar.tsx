import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import axios from '../lib/axios';

function Navbar() {
	const router = useRouter();
	const { data: session } = useSession();

	async function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
		e.preventDefault();
		await axios
      .post(`${process.env.NEXT_PUBLIC_CUSTOM_SERVER_URL}/api/v1/auth/logout`)
      .then((res) => res.data);
		
    const data = await signOut({
      callbackUrl: "/",
      redirect: false,
    });

		router.push(data.url);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #b2b2b2",
      }}
    >
      <h6 style={{ fontSize: "20px" }}>Next Auth | Custom Backend example</h6>

      <div>
        {session?.user ? (
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <>
            <Link href={"/login"} style={{ marginRight: "1rem" }}>
              Login
            </Link>
            <Link href={"/signup"}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
