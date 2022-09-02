import { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />

      <main>{children}</main>
    </div>
  );
};

export default Layout;

// className = "flex-1 min-h-screen pt-12 px-6 md:px-12 bg-gray-100";
