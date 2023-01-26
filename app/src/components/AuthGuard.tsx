import React, { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    // if (status === "loading") return;
		// if (!data?.user) signIn();
    if (data?.user && !data?.user?.onboardingDone) {
			router.push("/onboarding");
    } 
		// else {
    // }
  }, [status, data?.user]);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === 'authenticated') {
		if (data?.user.onboardingDone) {
			return <div>{children}</div>;
		}
		//  else {
		// 	router.push("/onboarding");
		// 	return null;
		// }
  }

	return <span>Loading...</span>;
}

export default AuthGuard;
