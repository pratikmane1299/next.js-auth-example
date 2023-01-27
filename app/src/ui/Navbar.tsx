import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import axios from "../lib/axios";

import { Avatar, Dropdown, Navbar as FBNavbar } from "flowbite-react";
import Container from "./Container";

function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  async function handleLogout() {
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
    <FBNavbar fluid>
      <Container>
        <div className="py-2 flex justify-between border-b border-gray-200">
          <FBNavbar.Brand>
            <img alt="Full stack auth" />
          </FBNavbar.Brand>
          <FBNavbar.Toggle />
          {session?.user ? (
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    bordered
                    color="pink"
                    alt={`${session?.user?.firstname} ${session?.user?.lastname}`}
                    img={session?.user?.avatarUrl}
                    rounded={true}
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{`${session?.user?.firstname} ${session?.user?.lastname}`}</span>
                  {session?.user?.username && (
                    <span className="block truncate text-sm font-medium">
                      @{session?.user?.username}
                    </span>
                  )}
                </Dropdown.Header>
                <Dropdown.Item onClick={() => handleLogout()}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <FBNavbar.Collapse>
              <FBNavbar.Link href="/login">Login</FBNavbar.Link>
              <FBNavbar.Link href="/signup">Sign Up</FBNavbar.Link>
            </FBNavbar.Collapse>
          )}
        </div>
      </Container>
    </FBNavbar>
    // <div
    //   style={{
    //     width: "100%",
    //     display: "flex",
    //     justifyContent: "space-between",
    //     padding: "1rem 2rem",
    //     borderBottom: "1px solid #b2b2b2",
    //   }}
    // >
    //   <h6 style={{ fontSize: "20px" }}>Next Auth | Custom Backend example</h6>

    //   <div>
    //     {session?.user ? (
    //       <a href="#" onClick={handleLogout}>
    //         Logout
    //       </a>
    //     ) : (
    //       <>
    //         <Link href={"/login"} style={{ marginRight: "1rem" }}>
    //           Login
    //         </Link>
    //         <Link href={"/signup"}>Register</Link>
    //       </>
    //     )}
    //   </div>
    // </div>
  );
}

export default Navbar;
