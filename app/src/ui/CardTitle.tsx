import React from "react";

function CardTitle({
  title,
  classes = "",
}: {
  title: string;
  classes?: string;
}) {
  return (
    <h6 className={`text-2xl font-medium text-gray-700 ${classes}`}>{title}</h6>
  );
}

export default CardTitle;
