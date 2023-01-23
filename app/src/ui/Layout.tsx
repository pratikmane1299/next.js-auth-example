import React, { PropsWithChildren } from 'react'
import Navbar from './Navbar';

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout