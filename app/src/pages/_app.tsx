import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";

import AuthGuard from "@/components/AuthGuard";

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

export default function App(
  props: AppProps<{
    session: Session;
  }>
) {
  const {
    pageProps: { session, ...pageProps },
    Component,
  }: { Component: NextApplicationPage; pageProps: any } = props;

  return (
    <SessionProvider session={session}>
      {/* {Component.requireAuth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : ( */}
      <Component {...pageProps} />
      {/* )} */}
    </SessionProvider>
  );
}
