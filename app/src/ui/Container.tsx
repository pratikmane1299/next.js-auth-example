import React, { PropsWithChildren } from 'react'

function Container({ children }: PropsWithChildren) {
  return (
    <div className="px-4 w-full sm:mx-auto sm:max-w-3xl">
      {children}
    </div>
  );
}

export default Container