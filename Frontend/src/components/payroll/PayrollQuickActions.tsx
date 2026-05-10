import { payrollQuickActionsData } from "../../data/payrollData";

const PayrollQuickActions = () => {
  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4
        h-full
        flex flex-col
      "
    >
      {/* HEADER */}
      <div className="mb-4">
        <h3
          className="
            text-sm
            font-semibold
            text-zinc-800
          "
        >
          Quick Actions
        </h3>

        <p
          className="
            text-[11px]
            text-zinc-500
            mt-1
          "
        >
          Payroll shortcuts
        </p>
      </div>

      {/* ACTIONS */}
      <div className="space-y-2 flex-1">
        {payrollQuickActionsData.map(
          (item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className="
                  group
                  w-full
                  flex items-center gap-3
                  px-3 py-3
                  rounded-xl
                  border border-zinc-200
                  hover:bg-black
                  hover:border-black
                  transition-all
                  text-left
                "
              >
                {/* ICON */}
                <div
                  className="
                    w-9 h-9
                    rounded-xl
                    bg-black
                    flex items-center justify-center
                    text-white
                    shrink-0

                    group-hover:bg-white
                    group-hover:text-black
                    transition-all
                  "
                >
                  <Icon size={16} />
                </div>

                {/* TEXT */}
                <span
                  className="
                    text-[11px]
                    font-medium
                    text-zinc-700
                    whitespace-nowrap

                    group-hover:text-white
                    transition-all
                  "
                >
                  {item.title}
                </span>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default PayrollQuickActions;