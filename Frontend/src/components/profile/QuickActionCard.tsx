import {
  FileText,
  KeyRound,
  Pencil,
  CalendarPlus,
  ChevronRight,
} from "lucide-react";

const actions = [
  {
    id: 1,
    title: "Apply Leave",
    icon: CalendarPlus,
  },
  {
    id: 2,
    title: "Download Payslip",
    icon: FileText,
  },
  {
    id: 3,
    title: "Edit Profile",
    icon: Pencil,
  },
  {
    id: 4,
    title: "Change Password",
    icon: KeyRound,
  },
];

const QuickActionCard = () => {
  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4
        h-full
      "
    >
      {/* Header */}
      <div className="mb-4">
        <h2
          className="
            text-sm
            font-semibold
            text-zinc-800
          "
        >
          Quick Actions
        </h2>

        <p
          className="
            text-[11px]
            text-zinc-500
            mt-1
          "
        >
          Shortcuts for daily tasks
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className="
                group
                w-full
                flex items-center justify-between
                gap-3
                p-3
                rounded-xl
                border border-zinc-200
                hover:border-black
                hover:bg-black
                transition-all
              "
            >
              {/* Left */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="
                    w-9 h-9
                    rounded-lg
                    bg-zinc-100
                    border border-zinc-200
                    flex items-center justify-center
                    shrink-0
                    group-hover:bg-white
                    group-hover:border-white
                    transition-all
                  "
                >
                  <Icon
                    size={16}
                    className="
                      text-zinc-700
                    "
                  />
                </div>

                <span
                  className="
                    text-xs
                    font-medium
                    text-zinc-700
                    group-hover:text-white
                    transition-all
                    whitespace-nowrap
                  "
                >
                  {item.title}
                </span>
              </div>

              {/* Arrow */}
              <ChevronRight
                size={15}
                className="
                  text-zinc-400
                  group-hover:text-white
                  transition-all
                  shrink-0
                "
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActionCard;