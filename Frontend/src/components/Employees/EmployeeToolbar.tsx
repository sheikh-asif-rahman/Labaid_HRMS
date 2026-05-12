import { Search, Plus } from "lucide-react";

type EmployeeToolbarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const EmployeeToolbar = ({
  search,
  setSearch,
}: EmployeeToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <div className="relative w-full md:w-[380px] lg:w-[420px]">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            h-11
            w-full
            rounded-xl
            border border-zinc-200
            bg-white
            pl-11
            pr-4
            text-sm
            text-zinc-800
            outline-none
            transition-all
            duration-200
            focus:border-black
            focus:shadow-sm
          "
        />

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-zinc-400
          "
        />
      </div>

      {/* Add Employee */}
      <button
        className="
          group
          relative
          flex
          h-10
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-xl
          border border-black
          bg-black
          px-4
          text-xs
          font-medium
          tracking-wide
          text-white
          transition-all
          duration-300
          hover:bg-white
          hover:text-black
          hover:shadow-lg
          active:scale-95
        "
      >
        {/* Glitch Layers */}
        <span
          className="
            absolute
            inset-0
            opacity-20
            animate-pulse
            bg-[linear-gradient(90deg,transparent,white,transparent)]
            group-hover:hidden
          "
        />

        <span
          className="
            absolute
            left-[-120%]
            top-0
            h-full
            w-[80%]
            skew-x-[-20deg]
            bg-white/20
            animate-[glitch_2s_linear_infinite]
            group-hover:hidden
          "
        />

        <Plus
          size={15}
          className="
            relative
            z-10
            transition-transform
            duration-300
            group-hover:rotate-90
          "
        />

        <span className="relative z-10">
          Add Employee
        </span>

        <style>
          {`
            @keyframes glitch {
              0% {
                left: -120%;
              }
              100% {
                left: 140%;
              }
            }
          `}
        </style>
      </button>
    </div>
  );
};

export default EmployeeToolbar;