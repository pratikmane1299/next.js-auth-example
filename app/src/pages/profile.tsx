import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { toast } from 'react-toastify';

import { getGithubRepos } from "@/api/github";
import { updateProfile } from "@/api/profile";
import { reloadSession } from "@/utils";

import Layout from "@/ui/Layout";
import ProfileCard from "@/ui/ProfileCard";
import GithubRepos from "@/ui/GithubRepos";
import Meta from "@/components/Meta";
import EditProfileModal from "@/ui/EditProfileModal";


const Profile = () => {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<any[]>([]);
  const [isFetchingRepos, setIsFetching] = useState(false);
  const [editProfileModalOpen, toggleEditProfileModal] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  useEffect(() => {
    if (session?.user?.github?.username) {
      setIsFetching(true);
      getGithubRepos(session?.user?.github?.username)
        .then((data: any) => {
          setRepos(data?.repos);
        })
        .finally(() => setIsFetching(false));
    }
  }, []);

  async function handleUpdateProfile(profile: any) {
    setIsUpdatingProfile(true);

    try {
      const res: any = await updateProfile(profile);
      reloadSession();
      toggleEditProfileModal(false);
      toast("Profile updated successfully", {
        type: "success",
        autoClose: 2000,
      });
    } catch (error: any) {
      toast(
        error?.response?.data?.message ||
          "Could not update profile, try after sometime",
        {
          type: "error",
          autoClose: 2000,
        }
      );
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  return (
    <Layout>
      <div
        style={{
          width: "100%",
          margin: "50px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Meta
          title={`${session?.user?.firstname} ${session?.user?.lastname} profile`}
          description={
            session?.user?.bio ||
            `${session?.user?.firstname} ${session?.user?.lastname}'s profile`
          }
          canonicalUrl="/profiile"
        />
        <ProfileCard
          user={session?.user}
          onEditProfile={() => toggleEditProfileModal(true)}
        />
        {session?.user?.github?.enabled && (
          <div className="mt-5">
            <GithubRepos repos={repos} />
          </div>
        )}
      </div>

      <EditProfileModal
        show={editProfileModalOpen}
        user={session?.user}
        isUpdating={isUpdatingProfile}
        onClose={() => toggleEditProfileModal(false)}
        onUpdateProfile={handleUpdateProfile}
      />
      {/* {editProfileModalOpen && (
      )} */}
    </Layout>
  );
};

Profile.requireAuth = true;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
      props: {},
    };
  } catch (error) {
    return { props: {} };
  }
};

export default Profile;
