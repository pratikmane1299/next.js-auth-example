import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NextPageContext } from "next";
import { getCsrfToken, signIn, getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Provider } from "next-auth/providers";

function Login({
  csrfToken,
  providers,
}: {
  csrfToken: string;
  providers: Provider[];
}) {
	const {status} = useSession();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated'){
			router.push("/");
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

    const res = await signIn("credentials", {
      email: loginForm.email,
      password: loginForm.password,
      csrfToken,
      redirect: false,
    });

    if (!res?.ok && res?.error) {
      return setError(res?.error);
    }

    router.push("/");
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
                    Sign in with {provider.name}
                  </button>
                </div>
              );
            }
          })}
        </div>

        <form onSubmit={handleOnLogin}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="text"
              value={loginForm.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              id="password"
              name="password"
              type="password"
              value={loginForm.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>

        {error && <span>{error}</span>}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  console.log(providers);

  return {
    props: { csrfToken, providers },
  };
}

export default Login;
