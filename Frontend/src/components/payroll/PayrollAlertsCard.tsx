// ========================================
// src/components/payroll/PayrollAlertsCard.tsx
// ========================================

import {
  AlertTriangle,
} from "lucide-react";

import {
  payrollAlertsData,
} from "../../data/payrollInsightsData";

const PayrollAlertsCard = () => {
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
      <div className="mb-5">
        <h3
          className="
            text-sm
            font-semibold
            text-zinc-800
          "
        >
          Salary Alerts
        </h3>

        <p
          className="
            text-[10px]
            text-zinc-500
            mt-1
          "
        >
          Payroll warnings & issues
        </p>
      </div>

      {/* ALERTS */}
      <div className="space-y-3 flex-1">
        {payrollAlertsData.map(
          (item) => (
            <div
              key={item.id}
              className="
                border border-zinc-200
                rounded-2xl
                p-3
                hover:bg-zinc-50
                transition-all
              "
            >
              <div className="flex gap-3">
                {/* ICON */}
                <div
                  className="
                    h-9 w-9
                    rounded-xl
                    bg-black
                    text-white
                    flex items-center justify-center
                    shrink-0
                  "
                >
                  <AlertTriangle
                    size={16}
                  />
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  <div
                    className="
                      flex items-start justify-between
                      gap-3
                    "
                  >
                    <h4
                      className="
                        text-[11px]
                        font-medium
                        text-zinc-800
                      "
                    >
                      {item.title}
                    </h4>

                    <span
                      className={`
                        px-2 py-1
                        rounded-lg
                        text-[9px]
                        font-medium
                        whitespace-nowrap

                        ${
                          item.status ===
                          "Critical"
                            ? "bg-black text-white"
                            : item.status ===
                              "Pending"
                            ? "border border-black text-black"
                            : "bg-zinc-200 text-zinc-700"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p
                    className="
                      text-[10px]
                      text-zinc-500
                      mt-2
                      leading-relaxed
                    "
                  >
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* FOOTER */}
      <div
        className="
          pt-4 mt-4
          border-t border-zinc-200
          flex items-center justify-between
        "
      >
        <p
          className="
            text-[10px]
            text-zinc-500
          "
        >
          4 active alerts
        </p>

        <p
          className="
            text-[10px]
            text-zinc-400
          "
        >
          Needs review
        </p>
      </div>
    </div>
  );
};

export default PayrollAlertsCard;