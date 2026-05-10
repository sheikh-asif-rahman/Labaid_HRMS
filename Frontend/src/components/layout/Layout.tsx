import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import Dashboard from "../../pages/Dashboard";
import Profile from "../../pages/Profile";

const Layout = () => {
  const [open, setOpen] =
    useState(false);

  const [active, setActive] =
    useState("Dashboard");

  return (
    <div className="bg-zinc-100">
      {/* SIDEBAR */}
      <Sidebar
        open={open}
        setOpen={setOpen}
        active={active}
        setActive={setActive}
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
          
          {active === "Dashboard" && (
            <Dashboard />
          )}

          {active === "Profile" && (
            <Profile />
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;