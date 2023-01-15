import nextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function getCurrentUser(token: string) {
	return fetch(`${process.env.NEXT_PUBLIC_CUSTOM_SERVER_URL}/api/v1/me` || "", {
		method: 'GET',
    headers: {
      "AccessToken": token,
			"Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export const authOptions: NextAuthOptions = {
  providers: [
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
    signIn: async ({ user }) => {
      if (user) return true;
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
