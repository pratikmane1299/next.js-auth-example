import React from "react";
import Head from "next/head";

type MetaPropsType = {
  title: string;
  description: string;
  canonicalUrl: string;
};

function Meta({ title, description, canonicalUrl }: MetaPropsType) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={`${process.env.APP_URL}${canonicalUrl}`} />
    </Head>
  );
}

export default Meta;
