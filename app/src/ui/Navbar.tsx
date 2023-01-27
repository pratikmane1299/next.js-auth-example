import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import axios from "../lib/axios";

import { Avatar, Dropdown, Navbar as FBNavbar } from "flowbite-react";
import Container from "./Container";
import ExternalLink from "@/components/ExternalLink";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

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
            <img
              alt="Full stack auth"
              src="/next-auth.jpeg"
              className="w-[35px] mr-2"
            />
            Next Auth | External backend
          </FBNavbar.Brand>
          {session?.user ? (
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    color="pink"
                    alt={`${session?.user?.firstname} ${session?.user?.lastname}`}
                    img={session?.user?.avatarUrl}
                    rounded={true}
                    className="p-0 border-2 border-pink-600 rounded-full"
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
            <>
              <ExternalLink
                href="https://github.com/pratikmane1299"
                className="hover:underline cursor-pointer text-base font-normal flex items-center"
              >
                <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                Github
              </ExternalLink>
            </>
          )}
        </div>
      </Container>
    </FBNavbar>
  );
}

export default Navbar;
