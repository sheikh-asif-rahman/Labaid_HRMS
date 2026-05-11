// ========================================
// src/components/payroll/PayrollTimelineCard.tsx
// ========================================

import {
  payrollTimelineData,
} from "../../data/payrollTimelineData";

const PayrollTimelineCard = () => {
  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4
        min-h-[420px]
        flex flex-col
      "
    >
      {/* HEADER */}
      <div className="mb-6">
        <h3
          className="
            text-sm
            font-semibold
            text-zinc-800
          "
        >
          Payroll Timeline
        </h3>

        <p
          className="
            text-[10px]
            text-zinc-500
            mt-1
          "
        >
          Payroll workflow progress
        </p>
      </div>

      {/* TIMELINE */}
      <div className="flex-1">
        {payrollTimelineData.map(
          (item, index) => (
            <div
              key={item.id}
              className="
                flex gap-4
                relative
                pb-6
                last:pb-0
              "
            >
              {/* LINE */}
              {index !==
                payrollTimelineData.length -
                  1 && (
                <div
                  className="
                    absolute
                    left-[8px]
                    top-5
                    w-[1px]
                    h-full
                    bg-zinc-200
                  "
                />
              )}

              {/* DOT */}
              <div
                className={`
                  h-4 w-4
                  rounded-full
                  mt-1
                  shrink-0
                  relative z-10

                  ${
                    item.status ===
                    "completed"
                      ? "bg-black"
                      : item.status ===
                        "current"
                      ? "border-2 border-black bg-white"
                      : "bg-zinc-300"
                  }
                `}
              />

              {/* CONTENT */}
              <div className="flex-1">
                <div
                  className="
                    flex items-start justify-between
                    gap-3
                  "
                >
                  <div>
                    <h4
                      className="
                        text-[11px]
                        font-medium
                        text-zinc-800
                      "
                    >
                      {item.title}
                    </h4>

                    <p
                      className="
                        text-[10px]
                        text-zinc-500
                        mt-1
                      "
                    >
                      {item.time}
                    </p>
                  </div>

                  <span
                    className={`
                      px-2 py-1
                      rounded-lg
                      text-[9px]
                      font-medium
                      whitespace-nowrap

                      ${
                        item.status ===
                        "completed"
                          ? "bg-black text-white"
                          : item.status ===
                            "current"
                          ? "border border-black text-black"
                          : "bg-zinc-200 text-zinc-600"
                      }
                    `}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PayrollTimelineCard;