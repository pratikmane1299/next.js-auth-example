import React, { PropsWithChildren } from 'react'

function Container({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      {children}
    </div>
  );
}

export default Container