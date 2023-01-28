import Head from "next/head";
import Link from "next/link";
import { Inter } from "@next/font/google";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import Layout from "@/ui/Layout";
import Meta from "@/components/Meta";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <Meta
        title="Next Auth | Custom Backend example"
        description="Next.js authentication with next auth and external backend."
        canonicalUrl="/"
      />
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
