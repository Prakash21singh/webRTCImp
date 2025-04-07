import React from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="w-full flex items-center h-screen justify-center">
      <div>This is the Auth Form</div>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
