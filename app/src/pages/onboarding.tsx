import React, { ChangeEvent, FormEvent, useState } from "react";
import { NextPageContext } from "next";
import { getCsrfToken } from "next-auth/react";
import api from "@/lib/axios";
import { useRouter } from "next/router";

function OnBoarding({ csrfToken }: { csrfToken: string }) {
  const router = useRouter();
  const [onboardingForm, setOnBoardingForm] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    socials: {
      twitter: "",
      instagram: "",
    },
  });
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    console.log({
      name,
      value,
    });

    setOnBoardingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setIsSaving(true);

    try {
      const res = await api
        .post("/api/v1/save-onboarding", {
          ...onboardingForm,
        })
        .then((res) => res.data);

      if (res.success) {
        return router.push("/profile");
      }
    } catch (error) {
      console.log("error - ", error);
    } finally {
      setIsSaving(false);
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
      <div
        style={{
          width: "500px",
          display: "flex",
          flexDirection: "column",
          border: "1px solid red",
          padding: "1rem",
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input name="csrfToken" type={"hidden"} defaultValue={csrfToken} />
          <label htmlFor="firstname" style={{ display: "block" }}>
            First Lame
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={onboardingForm.firstname}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="lastname" style={{ display: "block" }}>
            Last Name
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={onboardingForm.lastname}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="bio" style={{ display: "block" }}>
            Bio
            <textarea
              name="bio"
              id="bio"
              rows={3}
              value={onboardingForm.bio}
              onChange={handleChange}
            ></textarea>
          </label>

          <label htmlFor="twitter" style={{ display: "block" }}>
            Twitter username
            <input
              type={"text"}
              id="twitter"
              name="twitter"
              value={onboardingForm.socials.twitter}
              onChange={(e) => {
								const {value} = e.target;

								setOnBoardingForm((prev) => ({
                  ...prev,
                  socials: {
                    ...prev.socials,
                    twitter: value,
                  },
                }));
							}}
            />
          </label>
          <label htmlFor="instagram" style={{ display: "block" }}>
            Instagram username
            <input
              type={"text"}
              id="instagram"
              name="instagram"
              value={onboardingForm.socials.instagram}
              onChange={(e) => {
								const {value} = e.target;

								setOnBoardingForm((prev) => ({
                  ...prev,
                  socials: {
                    ...prev.socials,
                    instagram: value,
                  },
                }));
							}}
            />
          </label>

          <button type="submit">{isSaving ? "..." : `Let's begin...`}</button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const csrfToken = await getCsrfToken(context);

  return { props: { csrfToken } };
}

export default OnBoarding;
