import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Flag to check if onboarding process in completed */
      onboardingDone: boolean;
			firstname: string;
			lastname: string;
			avatarUrl: string;
			username: string;
			bio: string;
			github?: {
				enabled: boolean;
				id: string;
				username: string;
				link: string;
				accessToken: string;
			}
    } & DefaultSession["user"];
  }
}
