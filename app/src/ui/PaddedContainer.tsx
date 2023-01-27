import React, { PropsWithChildren } from "react";

function PaddedContainer({ children }: PropsWithChildren) {
  return <div className="p-4">{children}</div>;
}

export default PaddedContainer;
