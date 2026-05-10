import {
  LayoutDashboard,
  Users,
  Clock3,
  Wallet,
  UserCircle2,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

interface SidebarProps {
  open: boolean;

  setOpen: (open: boolean) => void;
}

const sidebarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Employees",
    path: "/employees",
    icon: Users,
  },

  {
    title: "Attendance",
    path: "/attendance",
    icon: Clock3,
  },

  {
    title: "Payroll",
    path: "/payroll",
    icon: Wallet,
  },

  {
    title: "Profile",
    path: "/profile",
    icon: UserCircle2,
  },

  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar = ({
  open,
  setOpen,
}: SidebarProps) => {
  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 bg-black/40 z-40
          transition-all duration-300
          lg:hidden

          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-[280px]
          h-screen
          bg-white
          border-r border-zinc-200
          flex flex-col
          transition-all duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* TOP */}
        <div
          className="
            h-20
            border-b border-zinc-200
            flex items-center justify-between
            px-6
            shrink-0
          "
        >
          <div>
            <h1
              className="
                text-2xl font-bold
                text-zinc-800
              "
            >
              HRMS
            </h1>

            <p
              className="
                text-sm text-zinc-500
              "
            >
              Human Resource System
            </p>
          </div>

          {/* CLOSE */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* MENU */}
        <div
          className="
            flex-1
            overflow-y-auto
            p-4 space-y-2
          "
        >
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              path={item.path}
              icon={item.icon}
              onClick={() =>
                setOpen(false)
              }
            />
          ))}
        </div>

        {/* BOTTOM */}
        <div
          className="
            p-4
            border-t border-zinc-200
            shrink-0
          "
        >
          <button
            className="
              w-full
              flex items-center gap-3
              px-4 py-3
              rounded-2xl
              text-red-500
              hover:bg-red-50
              transition-all
            "
          >
            <LogOut size={20} />

            <span className="font-medium">
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;