import React from "react";
import { NextPageContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

import Layout from "@/ui/Layout";

const Profile = ({ user }: { user: any }) => {
  return (
    <Layout>
      <div
        style={{
          margin: "50px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "200px",
            border: "3px solid red",
            borderRadius: "50%",
            padding: "0.5rem",
          }}
        >
          <img
            src={user.avatarUrl}
            alt={user.email}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <span style={{ marginTop: "1rem" }}>
          {user.username
            ? user.username
            : user?.github?.enabled
            ? user?.github?.username
            : ''}
        </span>
				<span style={{marginTop: '0.2rem'}}>
					{user?.email}
				</span>
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
