import React, { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import FullScreenLoader from "@/ui/FullScreenLoader";

function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
		// if (!data?.user) signIn();
  }, [status, data?.user]);

  if (status === "loading") {
    return <FullScreenLoader />
  }

  if (status === 'authenticated') {
		return <div>{children}</div>;
  }

	return <FullScreenLoader />
}

export default AuthGuard;
