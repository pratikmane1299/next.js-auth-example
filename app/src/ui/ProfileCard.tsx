import React from "react";
import { CalendarIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

import { Avatar, Button } from "flowbite-react";
import ProfileTags from "./ProfileTags";
import TwitterIcon from "./TwitterIcon";
import InstagramIcon from "./InstagramIcon";
import ExternalLink from "@/components/ExternalLink";

function ProfileCard({ user, onEditProfile }: { user: any, onEditProfile: () => void;}) {
  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full rounded-xl overflow-hidden shadow bg-white ring-1 ring-black ring-opacity-5">
        <div className="relative">
          <div className="w-full h-[250px] overflow-hidden">
            <img
              src="https://flowbite.com/docs/images/blog/image-1.jpg"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-12 w-full">
            <div className="p-4 w-full flex justify-between items-end">
              <Avatar
                rounded
                size={"lg"}
                color={"pink"}
                img={user.avatarUrl}
                alt={user.firstname + user.lastname}
                className="p-0 border-2 border-pink-600 rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="p-4 flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mt-8 flex-1 flex flex-col">
              <h6 className="text-3xl font-medium text-gray-700">
                {user.firstname + " " + user.lastname}
              </h6>
              <span className="text-sm font-medium text-gray-500">
                @{user.username}sdfs
              </span>

              <p className="mt-2 text-base font-medium text-gray-700">
                {user.bio}
              </p>

              <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                <span className="flex items-center text-gray-700 font-medium text-xs">
                  <CalendarIcon className="h-5 w-5 mr-1" />
                  Joined 24 Aug 2023
                </span>

                {user?.website && (
                  <span className="flex items-center text-blue-600 font-medium text-xs">
                    <GlobeAltIcon className="h-5 w-5 mr-1" />
                    <a
                      href={user?.website}
                      target={"_blank"}
                      rel="noreferrer;nofollow"
                      className="text-blue-600 underline text-xs font-medium"
                    >
                      {user?.website}
                    </a>
                  </span>
                )}

                {user?.socials?.twitter && (
                  <ExternalLink
                    href={`https://twitter.com/${user?.socials?.twitter}`}
                    className="flex items-center text-gray-700 font-medium text-xs cursor-pointer hover:underline"
                  >
                    <TwitterIcon className="h-5 w-5 mr-1 text-gray-700" />
                    Twitter
                  </ExternalLink>
                )}
                {user?.socials?.instagram && (
                  <ExternalLink
                    href={`https://www.instagram.com/${user?.socials?.instagram}`}
                    className="flex items-center text-gray-700 font-medium text-xs cursor-pointer hover:underline"
                  >
                    <InstagramIcon className="h-5 w-5 mr-1 text-gray-700" />
                    Instagram
                  </ExternalLink>
                )}
              </div>

              {user?.tags?.length > 0 && <ProfileTags tags={user?.tags} />}
            </div>

            <Button
              type="button"
              className="mt-2 md:mt-0"
              onClick={onEditProfile}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
