import React from 'react'

import ProfileTag from './ProfileTag';

function ProfileTags({tags}: {tags: string[]}) {
  return (
    <div className="mt-4 inline-flex flex-wrap gap-2">
      {tags?.map((tag, idx) => (
        <ProfileTag key={idx} tag={tag} />
      ))}
    </div>
  );
}

export default ProfileTags