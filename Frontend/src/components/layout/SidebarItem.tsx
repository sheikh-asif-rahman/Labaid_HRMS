import type {
  LucideIcon,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

interface SidebarItemProps {
  icon: LucideIcon;

  title: string;

  path: string;

  onClick?: () => void;
}

const SidebarItem = ({
  icon: Icon,
  title,
  path,
  onClick,
}: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({
        isActive,
      }) => `
        w-full
        flex items-center gap-4
        px-4 py-3
        rounded-2xl
        transition-all duration-200

        ${
          isActive
            ? "bg-black text-white shadow-lg"
            : "text-zinc-600 hover:bg-zinc-100"
        }
      `}
    >
      <Icon size={20} />

      <span className="font-medium text-sm">
        {title}
      </span>
    </NavLink>
  );
};

export default SidebarItem;