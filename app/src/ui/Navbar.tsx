import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Navbar() {
	const { data: session } = useSession();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        border: "1px solid red",
      }}
    >
      <h6 style={{ fontSize: "20px" }}>Next Auth | Custom Backend example</h6>

      <div>
				{session?.user ? (
					<a href="#">Logout</a>
				) : (
					<>
						<Link href={"/login"} style={{ marginRight: "1rem" }}>
							Login
						</Link>
						<Link href={"/register"}>Register</Link>
					</>
				)}
      </div>
    </div>
  );
}

export default Navbar;
