import React, { PropsWithChildren } from "react";

function Card({ children }: PropsWithChildren) {
  return (
    <div className="rounded-xl shadow ring-1 ring-black ring-opacity-5 bg-white">
      {children}
    </div>
  );
}

export default Card;
