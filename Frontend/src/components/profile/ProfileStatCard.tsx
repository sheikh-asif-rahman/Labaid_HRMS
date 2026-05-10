import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  subtitle: string;
  value: string;
}

const ProfileStatCard = ({
  icon,
  subtitle,
  value,
}: Props) => {
  return (
    <div
      className="
        bg-white
        border
        border-zinc-200
        rounded-2xl
        px-3
        py-3
        sm:px-4
        sm:py-4
        flex
        items-center
        gap-2
        min-h-[78px]
      "
    >
      {/* Icon */}
      <div
        className="
          w-9 h-9
          sm:w-10 sm:h-10
          rounded-xl
          bg-zinc-100
          flex
          items-center
          justify-center
          text-zinc-700
          shrink-0
        "
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {/* Subtitle */}
        <p
          className="
            text-[9px]
            sm:text-[10px]
            md:text-[11px]
            lg:text-xs
            text-zinc-500
            leading-none
            whitespace-nowrap
          "
        >
          {subtitle}
        </p>

        {/* Value */}
        <h3
          className="
            mt-1
            text-[11px]
            sm:text-xs
            md:text-sm
            lg:text-[15px]
            font-semibold
            text-zinc-800
            leading-none
            whitespace-nowrap
          "
        >
          {value}
        </h3>
      </div>
    </div>
  );
};

export default ProfileStatCard;