// ==============================
// src/components/layout/SidebarItem.tsx
// ==============================

import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  title: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon: Icon,
  title,
  active,
  onClick,
}: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-4
        px-4 py-3 rounded-2xl
        transition-all duration-200
        ${
          active
            ? "bg-black text-white shadow-lg"
            : "text-zinc-600 hover:bg-zinc-100"
        }
      `}
    >
      <Icon size={20} />

      <span className="font-medium text-sm">
        {title}
      </span>
    </button>
  );
};

export default SidebarItem;