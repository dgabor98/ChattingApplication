import React from "react";
import Navbar from "./Navbar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = ({ children }: any) => {
  return (
    <div className="flex h-screen w-screen flex-col bg-[rgb(14,17,22)] text-gray-900">
      <Navbar />
      <main className="flex-grow p-8">{children}</main>
    </div>
  );
};

export default Layout;
