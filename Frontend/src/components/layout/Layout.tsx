import { useState } from "react";

import {
  Outlet,
  useLocation,
} from "react-router-dom";

import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

const Layout = () => {
  const [open, setOpen] =
    useState(false);

  const location = useLocation();

  const pathname =
    location.pathname.split("/")[1];

  const active = pathname
    ? pathname.charAt(0).toUpperCase() +
      pathname.slice(1)
    : "Dashboard";

  return (
    <div className="bg-zinc-100">
      {/* SIDEBAR */}
      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      {/* MAIN */}
      <div className="lg:ml-[280px]">
        {/* NAVBAR */}
        <Navbar
          setOpen={setOpen}
          active={active}
        />

        {/* PAGE CONTENT */}
        <main className="p-4 lg:p-8 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;