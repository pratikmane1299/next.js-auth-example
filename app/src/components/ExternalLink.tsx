import React, { ComponentProps, PropsWithChildren } from "react";

function ExternalLink({
  href,
  children,
	...props
}: PropsWithChildren<ComponentProps<"a">>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" {...props}>
      {children}
    </a>
  );
}

export default ExternalLink;
