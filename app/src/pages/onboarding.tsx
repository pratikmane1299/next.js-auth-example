import React, { ChangeEvent, FormEvent, useState } from "react";
import { NextPageContext } from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Label,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";

import api from "@/lib/axios";

import CardTitle from "@/ui/CardTitle";

function OnBoarding({ csrfToken }: { csrfToken: string }) {
  const router = useRouter();
  const [onboardingForm, setOnBoardingForm] = useState({
    firstname: "",
    lastname: "",
    bio: "",
		website: "",
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
      <div className="w-full max-w-md">
        <div className="rounded-xl shadow ring-1 ring-black ring-opacity-5 bg-white">
          <div className="p-4">
            <CardTitle title="Fill in some details first," classes="mb-10" />
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="csrfToken"
                type={"hidden"}
                defaultValue={csrfToken}
              />
              <div className="grid grid-cols-2 gap-x-3">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="firstname" value="Firstname" />
                  </div>
                  <TextInput
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={onboardingForm.firstname}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="lastname" value="Lastname" />
                  </div>
                  <TextInput
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={onboardingForm.lastname}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="bio">Bio</Label>
                </div>
                <Textarea
                  id="bio"
									name="bio"
                  placeholder="Write something about yourself..."
                  required={true}
                  rows={4}
                  value={onboardingForm.bio}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="website">Website</Label>
                </div>
                <TextInput
                  id="website"
                  name="website"
									placeholder="www.mycoolsite.com"
                  value={onboardingForm.website}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-x-3">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="twitter">Twitter</Label>
                  </div>
                  <TextInput
                    id="twitter"
                    name="twitter"
                    value={onboardingForm.socials.twitter}
										helperText="Only enter valid username"
                    onChange={(e) => {
                      const { value } = e.target;

                      setOnBoardingForm((prev) => ({
                        ...prev,
                        socials: {
                          ...prev.socials,
                          twitter: value,
                        },
                      }));
                    }}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="instagram">Instagram</Label>
                  </div>
                  <TextInput
                    id="instagram"
                    name="instagram"
										helperText="Only enter valid username"
                    value={onboardingForm.socials.instagram}
                    onChange={(e) => {
                      const { value } = e.target;

                      setOnBoardingForm((prev) => ({
                        ...prev,
                        socials: {
                          ...prev.socials,
                          instagram: value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  {isSaving ? (
                    <div className="mr-3">
                      <Spinner size="sm" light={true} />
                    </div>
                  ) : (
                    `Let's begin...`
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const csrfToken = await getCsrfToken(context);

  return { props: { csrfToken } };
}

export default OnBoarding;
