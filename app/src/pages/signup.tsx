import React, { ChangeEvent, useEffect, useState } from "react";
import { NextPageContext } from "next";
import { Provider } from "next-auth/providers";
import {
  getCsrfToken,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import GithubLoginButton from "@/ui/GithubLoginButton";
import CardTitle from "@/ui/CardTitle";

function Signup({
  csrfToken,
  providers,
}: {
  csrfToken: string;
  providers: Provider[];
}) {
  const router = useRouter();
  const { status, data } = useSession();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("signup", {
      email: signUpForm.email,
      password: signUpForm.password,
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
        <Card>
					<CardTitle title="Create a account" classes="mb-10" />
          {/* <h6 className="mb-10 text-2xl font-medium text-gray-700">
            Create a account
          </h6> */}
          <div className="my-4 flex flex-col w-full">
            {Object.values(providers).map((provider) => {
              if (provider.id === "github") {
                return (
                  <GithubLoginButton onClick={() => signIn(provider.id)} />
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
          <form className="flex flex-col space-y-4" onSubmit={handleSignup}>
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
                value={signUpForm.email}
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
                value={signUpForm.password}
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
                "Create account"
              )}
            </Button>
          </form>
          <div className="mt-2">
            <span className="text-sm font-normal text-gray-700">
              Already have an account ?{" "}
              <Link className="text-blue-600" href={"/login"}>
                Login
              </Link>
            </span>
          </div>
        </Card>
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

export default Signup;
