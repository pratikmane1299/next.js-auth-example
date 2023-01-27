import React, { PropsWithChildren } from "react";

import Card from "./Card";

function PaddedCard({ children }: PropsWithChildren) {
  return (
    <Card>
      <div className="p-4">{children}</div>
    </Card>
  );
}

export default PaddedCard;
