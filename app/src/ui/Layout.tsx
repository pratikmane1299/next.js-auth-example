import React, { PropsWithChildren } from 'react'
import Container from './Container';
import Navbar from './Navbar';

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar />
			<Container>
      	{children}
			</Container>
    </div>
  );
}

export default Layout