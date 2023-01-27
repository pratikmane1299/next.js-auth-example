import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NextPageContext } from "next";
import {
  getCsrfToken,
  signIn,
  getProviders,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/router";
import { Provider } from "next-auth/providers";
import Link from "next/link";
import { Button, Label, Spinner, TextInput } from "flowbite-react";

import GithubLoginButton from "@/ui/GithubLoginButton";
import CardTitle from "@/ui/CardTitle";
import PaddedCard from "@/ui/PaddedCard";

function Login({
  csrfToken,
  providers,
}: {
  csrfToken: string;
  providers: Provider[];
}) {
  const { status, data } = useSession();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (!data?.user?.onboardingDone) {
        router.push("/onboarding");
      } else {
        router.push("/profile");
      }
    }
  }, [status]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleOnLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email: loginForm.email,
      password: loginForm.password,
      csrfToken,
      redirect: false,
    });

    setLoading(false);

    if (!res?.ok && res?.error) {
      return setError(res?.error);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eee",
      }}
    >
      <div className="w-full max-w-sm">
        <PaddedCard>
					<CardTitle title="Welcome back" classes="mb-10" />
					<div className="my-4 flex flex-col w-full">
						{Object.values(providers).map((provider) => {
							if (provider.id === "github") {
								return (
                  <GithubLoginButton
                    key={provider.id}
                    onClick={() => signIn(provider.id)}
                  />
                );
							}
						})}
						<div className="mt-4 flex items-center justify-around">
							<div className="w-full h-[1px] bg-gray-200" />
							<span className="block px-2 text-sm font-normal text-gray-600">
								or
							</span>
							<div className="w-full h-[1px] bg-gray-200" />
						</div>
					</div>
					<form className="flex flex-col space-y-4" onSubmit={handleOnLogin}>
						<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
						<div>
							<div className="mb-2 block">
								<Label htmlFor="email" value="Email" />
							</div>
							<TextInput
								id="email"
								name="email"
								type="text"
								placeholder="name@domain.com"
								value={loginForm.email}
								onChange={handleChange}
								required={true}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Password" />
							</div>
							<TextInput
								id="password"
								name="password"
								type="password"
								value={loginForm.password}
								onChange={handleChange}
								required={true}
							/>
						</div>

						{error && (
							<span className="text-xs font-medium text-red-600">{error}</span>
						)}

						<Button type="submit">
							{loading ? (
								<div className="mr-3">
									<Spinner size="sm" light={true} />
								</div>
							) : (
								"Login"
							)}
						</Button>
					</form>
					<div className="mt-2">
						<span className="text-sm font-normal text-gray-700">
							Don't have an account ?{" "}
							<Link className="text-blue-600" href={"/signup"}>
								Sign up here
							</Link>
						</span>
					</div>
        </PaddedCard>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: { csrfToken, providers },
  };
}

export default Login;
