import React from 'react'
import { Badge } from 'flowbite-react'

function ProfileTag({ tag }: { tag: string }) {
  return <Badge size={'sm'}>{tag}</Badge>;
}

export default ProfileTag