import Head from "next/head";
import { Inter } from "@next/font/google";

import Layout from "@/ui/Layout";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

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
      <main className="flex justify-center">
        <div className="flex flex-col items-center">
          <h1 className="mt-28 text-5xl font-normal text-gray-800 tracking-wider">
            Next Auth Example
          </h1>
          <p className="mt-12 text-xl font-normal text-gray-700 tracking-wide">
            Full stack authentication with next auth & external backend
          </p>
          <div>
            <Link
              href="/login"
              className="mt-16 py-2 border-b-2 border-pink-600 flex items-center text-gray-800 font-medium text-base tracking-normal"
            >
              Sign up with email
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
