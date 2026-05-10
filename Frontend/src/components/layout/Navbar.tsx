// ==============================
// src/components/layout/Navbar.tsx
// ==============================

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Bell,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";

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
                bg-black
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
                <h3
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  Notifications
                </h3>

                <span
                  className="
                    text-[11px]
                    bg-black
                    text-white
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
                              text-xs font-semibold
                              text-zinc-800
                            "
                          >
                            {
                              notification.title
                            }
                          </h4>

                          <p
                            className="
                              text-[11px]
                              text-zinc-500
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
                            text-[10px]
                            text-zinc-400
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
                  <h4
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    Sheikh Asif
                  </h4>

                  <p
                    className="
                      text-[11px]
                      text-zinc-500
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
                    text-xs
                  "
                >
                  <User size={16} />
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
                    text-xs
                  "
                >
                  <Settings size={16} />
                  Settings
                </button>

                <button
                  className="
                    w-full
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    hover:bg-zinc-100
                    transition-all
                    text-xs
                  "
                >
                  <LogOut size={16} />
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