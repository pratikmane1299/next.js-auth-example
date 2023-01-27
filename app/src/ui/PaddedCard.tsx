import React, { PropsWithChildren } from "react";

import Card from "./Card";

function PaddedCard({ children }: PropsWithChildren) {
  return (
    <Card>
      <PaddedCard>{children}</PaddedCard>
    </Card>
  );
}

export default PaddedCard;
