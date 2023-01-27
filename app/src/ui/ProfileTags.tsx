import React from 'react'

import ProfileTag from './ProfileTag';

function ProfileTags({tags}: {tags: string[]}) {
  return (
    <div className="mt-3 inline-flex flex-wrap space-x-2">
      {tags?.map((tag, idx) => (
        <ProfileTag key={idx} tag={tag} />
      ))}
    </div>
  );
}

export default ProfileTags