import React from "react";

import { Spinner } from "flowbite-react";

function FullScreenLoader() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Spinner size={"lg"} />
    </div>
  );
}

export default FullScreenLoader;
