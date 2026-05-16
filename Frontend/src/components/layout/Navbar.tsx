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
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="
      sticky top-0 z-30 h-20 bg-white border-b border-zinc-200
      px-4 lg:px-8 flex items-center justify-between
    ">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 rounded-xl hover:bg-zinc-100"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-2xl font-bold text-zinc-800">
          {active}
        </h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <div ref={notificationRef} className="relative">

          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-3 rounded-2xl bg-zinc-100 hover:bg-zinc-200"
          >
            <Bell size={20} />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-black" />
          </button>

          {/* ✅ RESPONSIVE DROPDOWN FIX */}
          {notificationOpen && (
            <div
              className="
                absolute right-0 top-[120%]
                w-[280px] sm:w-[320px] md:w-[340px]
                max-w-[90vw]
                bg-white border border-zinc-200
                rounded-2xl shadow-xl
                overflow-hidden z-50
              "
            >
              {/* HEADER */}
              <div className="px-5 py-4 border-b flex justify-between">
                <h3 className="text-sm font-semibold">Notifications</h3>

                <span className="text-[11px] bg-black text-white px-2 py-1 rounded-lg">
                  {notificationsData.length} New
                </span>
              </div>

              {/* ITEMS */}
              <div className="max-h-[400px] overflow-y-auto">
                {notificationsData.map((notification) => (
                  <button
                    key={notification.id}
                    className="w-full text-left px-5 py-4 hover:bg-zinc-50 border-b last:border-none"
                  >
                    <div className="flex justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-semibold">
                          {notification.title}
                        </h4>
                        <p className="text-[11px] text-zinc-500 mt-1">
                          {notification.message}
                        </p>
                      </div>

                      <span className="text-[10px] text-zinc-400 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE (unchanged) */}
        <div ref={profileRef} className="relative">

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="h-12 w-12 rounded-2xl overflow-hidden border"
          >
            <img
              src="https://i.pravatar.cc/150?img=12"
              className="h-full w-full object-cover"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-[120%] w-[240px] bg-white border rounded-2xl shadow-xl overflow-hidden z-50">

              <div className="p-4 flex items-center gap-3 border-b">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  className="h-12 w-12 rounded-xl object-cover"
                />

                <div>
                  <h4 className="text-sm font-semibold">Sheikh Asif</h4>
                  <p className="text-[11px] text-zinc-500">HR Manager</p>
                </div>
              </div>

              <div className="p-2 text-xs">

                <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-zinc-100 rounded-xl">
                  <User size={16} />
                  My Profile
                </button>

                <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-zinc-100 rounded-xl">
                  <Settings size={16} />
                  Settings
                </button>

                <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-zinc-100 rounded-xl">
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