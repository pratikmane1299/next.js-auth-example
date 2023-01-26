
import React, { ChangeEvent, useEffect, useState } from "react";import { NextPageContext } from "next";
import { Provider } from "next-auth/providers";
import { getCsrfToken, getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

function Signup({
  csrfToken,
  providers,
}: {
  csrfToken: string;
  providers: Provider[];
}) {
	const router = useRouter();
	const {status} = useSession();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

	useEffect(() => {
		if (status === 'authenticated'){
			router.push("/profile");
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

    const res = await signIn("signup", {
      email: signUpForm.email,
      password: signUpForm.password,
      csrfToken,
      redirect: false,
    });

    if (!res?.ok && res?.error) {
      return setError(res?.error);
    }

    router.push("/profile");
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
      <div
        style={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          border: "1px solid red",
          padding: "1rem",
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
          }}
        >
          {Object.values(providers).map((provider) => {
            if (provider.id !== "credentials") {
              return (
                <div key={provider.name}>
                  <button onClick={() => signIn(provider.id)}>
                    Sign up with {provider.name}
                  </button>
                </div>
              );
            }
          })}
        </div>

        <form onSubmit={handleSignup}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="text"
              value={signUpForm.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              id="password"
              name="password"
              type="password"
              value={signUpForm.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>

        {error && <span>{error}</span>}

        <div>
          <span>
            Already have an account ?<Link href={"/login"}>Login instead</Link>
          </span>
        </div>
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
