import Head from "next/head";
import { Inter } from "@next/font/google";

import Layout from "@/ui/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Next Auth | Custom server example</title>
        <meta
          name="description"
          content="Full stack auth example with next auth & custom server."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Full stack auth example with next auth & custom server.</main>
    </Layout>
  );
}
