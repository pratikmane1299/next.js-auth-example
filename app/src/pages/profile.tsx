import React, { useEffect, useState } from "react";
import { NextPageContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

import { getGithubRepos } from "@/api/github";

import Layout from "@/ui/Layout";
import ProfileCard from "@/ui/ProfileCard";
import GithubRepos from "@/ui/GithubRepos";

const Profile = ({ user }: { user: any }) => {
	const [repos, setRepos] = useState<any[]>([]);
	const [isFetchingRepos, setIsFetching] = useState(false);

	useEffect(() => {
		setIsFetching(true);
		getGithubRepos(user?.github?.username)
      .then((data: any) => {
        setRepos(data?.repos);
      })
      .finally(() => setIsFetching(false));
	}, []);

  return (
    <Layout>
      <div
        style={{
					width: '100%',
          margin: "50px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ProfileCard user={user} />
				<div className="mt-5">
					<GithubRepos repos={repos} />
				</div>
      </div>
    </Layout>
  );
}

Profile.requireAuth = true;

export async function getServerSideProps(context: NextPageContext) {
  try {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

		if (!session.user?.onboardingDone) {
			return {
        redirect: {
          destination: "/onboarding",
          permanent: false,
        },
      };
		}

    return {
      props: {
        user: (session && session.user) || {},
      },
    };
  } catch (error) {
    return {props: {}};
  }
}

export default Profile;
