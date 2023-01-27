import React from "react";
import { Button, ButtonProps } from "flowbite-react";

import GithubLogo from "./GithubLogo";

function GithubLoginButton(props: ButtonProps) {
  return (
    <Button color={"light"} {...props}>
      <GithubLogo className="mr-2" />
      Sign in with Github
    </Button>
  );
}

export default GithubLoginButton;
