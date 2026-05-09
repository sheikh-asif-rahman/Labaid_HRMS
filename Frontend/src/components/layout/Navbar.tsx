// ==============================
// src/components/layout/Navbar.tsx
// ==============================

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Bell,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";

import { employees } from "../../data/employeesData";
import { payrollData } from "../../data/payrollData";
import { attendanceData } from "../../data/attendanceData";
import { notificationsData } from "../../data/notificationsData";

interface NavbarProps {
  setOpen: (open: boolean) => void;
  active: string;
}

const Navbar = ({
  setOpen,
  active,
}: NavbarProps) => {
  // ==============================
  // STATES
  // ==============================

  const [search, setSearch] =
    useState("");

  const [focused, setFocused] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false);

  // ==============================
  // REFS
  // ==============================

  const notificationRef =
    useRef<HTMLDivElement>(null);

  const profileRef =
    useRef<HTMLDivElement>(null);

  // ==============================
  // SEARCH DATA
  // ==============================

  const searchableData = [
    ...employees.map((emp) => emp.name),

    ...employees.map(
      (emp) => emp.department
    ),

    ...employees.map((emp) => emp.role),

    ...employees.map((emp) => emp.id),

    ...payrollData.map(
      (payroll) => payroll.employee
    ),

    ...payrollData.map(
      (payroll) => payroll.month
    ),

    ...attendanceData.map(
      (attendance) =>
        attendance.employee
    ),

    ...attendanceData.map(
      (attendance) =>
        attendance.status
    ),
  ];

  // REMOVE DUPLICATES
  const uniqueSearchData = [
    ...new Set(searchableData),
  ];

  // ==============================
  // FILTERED SEARCH
  // ==============================

  const filteredSuggestions =
    useMemo(() => {
      if (!search.trim()) return [];

      return uniqueSearchData
        .filter((item) =>
          item
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .slice(0, 8);
    }, [search]);

  // ==============================
  // OUTSIDE CLICK
  // ==============================

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header
      className="
        sticky top-0 z-30
        h-20
        bg-white
        border-b border-zinc-200
        px-4 lg:px-8
        flex items-center justify-between
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* MOBILE MENU */}
        <button
          onClick={() => setOpen(true)}
          className="
            lg:hidden
            p-2 rounded-xl
            hover:bg-zinc-100
            transition-all
          "
        >
          <Menu size={24} />
        </button>

        {/* TITLE */}
        <h2
          className="
            text-2xl font-bold
            text-zinc-800
          "
        >
          {active}
        </h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* SEARCH */}
        <div className="relative hidden md:block">
          <div
            className="
              flex items-center gap-3
              bg-zinc-100
              px-4 py-3
              rounded-2xl
              w-[340px]
              border border-transparent
              focus-within:border-black
              transition-all
            "
          >
            <Search
              size={18}
              className="text-zinc-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onFocus={() =>
                setFocused(true)
              }
              onBlur={() => {
                setTimeout(() => {
                  setFocused(false);
                }, 150);
              }}
              placeholder="Search"
              className="
                bg-transparent
                outline-none
                w-full
                text-sm
              "
            />
          </div>

          {/* SEARCH SUGGESTIONS */}
          {focused &&
            filteredSuggestions.length >
              0 && (
              <div
                className="
                  absolute top-[110%] left-0
                  w-full
                  bg-white
                  border border-zinc-200
                  rounded-2xl
                  shadow-xl
                  overflow-hidden
                  z-50
                "
              >
                {filteredSuggestions.map(
                  (item, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSearch(item)
                      }
                      className="
                        w-full text-left
                        px-4 py-3
                        text-sm
                        hover:bg-zinc-100
                        transition-all
                        border-b border-zinc-100
                        last:border-none
                      "
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            )}
        </div>

        {/* NOTIFICATION */}
        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            onClick={() =>
              setNotificationOpen(
                !notificationOpen
              )
            }
            className="
              relative
              p-3 rounded-2xl
              bg-zinc-100
              hover:bg-zinc-200
              transition-all
            "
          >
            <Bell size={20} />

            <span
              className="
                absolute top-2 right-2
                h-2 w-2 rounded-full
                bg-red-500
              "
            />
          </button>

          {/* DROPDOWN */}
          {notificationOpen && (
            <div
              className="
                absolute right-0 top-[120%]
                w-[340px]
                bg-white
                border border-zinc-200
                rounded-2xl
                shadow-xl
                overflow-hidden
                z-50
              "
            >
              {/* HEADER */}
              <div
                className="
                  px-5 py-4
                  border-b border-zinc-100
                  flex items-center justify-between
                "
              >
                <h3 className="font-semibold">
                  Notifications
                </h3>

                <span
                  className="
                    text-xs
                    bg-red-100
                    text-red-500
                    px-2 py-1 rounded-lg
                  "
                >
                  {
                    notificationsData.length
                  }{" "}
                  New
                </span>
              </div>

              {/* ITEMS */}
              <div className="max-h-[400px] overflow-y-auto">
                {notificationsData.map(
                  (notification) => (
                    <button
                      key={notification.id}
                      className="
                        w-full text-left
                        px-5 py-4
                        hover:bg-zinc-50
                        transition-all
                        border-b border-zinc-100
                        last:border-none
                      "
                    >
                      <div
                        className="
                          flex items-start justify-between
                          gap-4
                        "
                      >
                        <div>
                          <h4
                            className="
                              text-sm font-semibold
                              text-zinc-800
                            "
                          >
                            {
                              notification.title
                            }
                          </h4>

                          <p
                            className="
                              text-sm text-zinc-500
                              mt-1
                            "
                          >
                            {
                              notification.message
                            }
                          </p>
                        </div>

                        <span
                          className="
                            text-xs text-zinc-400
                            whitespace-nowrap
                          "
                        >
                          {
                            notification.time
                          }
                        </span>
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div
          ref={profileRef}
          className="relative"
        >
          <button
            onClick={() =>
              setProfileOpen(
                !profileOpen
              )
            }
            className="
              h-12 w-12
              rounded-2xl
              overflow-hidden
              border border-zinc-200
              hover:scale-105
              transition-all
            "
          >
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt=""
              className="
                h-full w-full
                object-cover
              "
            />
          </button>

          {/* PROFILE DROPDOWN */}
          {profileOpen && (
            <div
              className="
                absolute right-0 top-[120%]
                w-[240px]
                bg-white
                border border-zinc-200
                rounded-2xl
                shadow-xl
                overflow-hidden
                z-50
              "
            >
              {/* TOP */}
              <div
                className="
                  p-4
                  border-b border-zinc-100
                  flex items-center gap-3
                "
              >
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt=""
                  className="
                    h-12 w-12
                    rounded-xl
                    object-cover
                  "
                />

                <div>
                  <h4 className="font-semibold">
                    Sheikh Asif
                  </h4>

                  <p
                    className="
                      text-sm text-zinc-500
                    "
                  >
                    HR Manager
                  </p>
                </div>
              </div>

              {/* MENU */}
              <div className="p-2">
                <button
                  className="
                    w-full
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    hover:bg-zinc-100
                    transition-all
                    text-sm
                  "
                >
                  <User size={18} />
                  My Profile
                </button>

                <button
                  className="
                    w-full
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    hover:bg-zinc-100
                    transition-all
                    text-sm
                  "
                >
                  <Settings size={18} />
                  Settings
                </button>

                <button
                  className="
                    w-full
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    hover:bg-red-50
                    text-red-500
                    transition-all
                    text-sm
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;