import nextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

function getCurrentUser(token: string) {
	return fetch(`${process.env.NEXT_PUBLIC_CUSTOM_SERVER_URL}/api/v1/me` || "", {
		method: 'GET',
    headers: {
      "AccessToken": token,
			"Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function githubAuth(account: any) {
	return fetch(
    `${process.env.NEXT_PUBLIC_CUSTOM_SERVER_URL}/api/v1/auth/github` || "",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    }
  ).then((res) => res.json());
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "enter email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CUSTOM_SERVER_URL}/api/v1/login` || "",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();

        if (res.ok) {
          return user;
        } else {
          throw new Error(user?.message);
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }: { user: any; account: any }) => {
      if (account?.provider === "github") {
        const res = await githubAuth({
          providerAccountId: account?.providerAccountId,
          scope: account?.scope,
          accessToken: account?.access_token,
          tokenType: account?.token_type,
        });

        if (res?.success) {
          user.accessToken = res.tokens?.accessToken;
          user.refreshToken = res.tokens?.refreshToken;
          return true;
        } else return false;
      } else {
        if (user) return true;
      }
      return false;
    },
    jwt: async ({ token, user }: { token: any; user?: any }) => {
      if (user) {
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // fetch user here...
      const res = await getCurrentUser(token?.accessToken);
			
      //TODO: call refresh tokens api if res is unauthorized

      session.accessToken = token?.accessToken;
      session.user = res?.user || {};

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default nextAuth(authOptions);
