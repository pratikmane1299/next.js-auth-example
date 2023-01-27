import React from "react";
import { CalendarIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

import { Avatar, Button } from "flowbite-react";

function ProfileCard({ user }: { user: any }) {
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
                bordered
                rounded
                size={"lg"}
                color={"pink"}
                img={user.avatarUrl}
                alt={user.firstname + user.lastname}
                className="p-0"
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="p-4 flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mt-8 flex-1 flex flex-col">
              <h6 className="text-3xl font-medium text-gray-700">
                {user.firstname + user.lastname}
              </h6>
              <span className="text-sm font-medium text-gray-500">
                @{user.username}sdfs
              </span>

              <p className="mt-2 text-base font-medium text-gray-700">
                {user.bio}
              </p>

              <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <span className="flex items-center text-gray-700 font-medium text-xs">
                  <CalendarIcon className="h-5 w-5 mr-1" />
                  Joined 24 Aug 2023
                </span>

                <span className="flex items-center text-blue-600 font-medium text-xs">
                  <GlobeAltIcon className="h-5 w-5 mr-1" />
                  <a
                    href="www.website.com"
                    target={"_blank"}
                    rel="noreferrer;nofollow"
                    className="text-blue-600 underline text-xs font-medium"
                  >
                    www.website.com
                  </a>
                </span>


              </div>
            </div>

            <Button className="mt-2 md:mt-0">Edit Profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
