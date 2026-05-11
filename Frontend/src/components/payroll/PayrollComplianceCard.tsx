// ========================================
// src/components/payroll/PayrollComplianceCard.tsx
// ========================================

import {
  payrollComplianceData,
} from "../../data/payrollTimelineData";

const PayrollComplianceCard = () => {
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
      <div className="mb-6">
        <h3
          className="
            text-sm
            font-semibold
            text-zinc-800
          "
        >
          Compliance & Tax
        </h3>

        <p
          className="
            text-[10px]
            text-zinc-500
            mt-1
          "
        >
          Payroll compliance overview
        </p>
      </div>

      {/* ITEMS */}
      <div className="space-y-5 flex-1">
        {payrollComplianceData.map(
          (item) => (
            <div key={item.id}>
              {/* TOP */}
              <div
                className="
                  flex items-center justify-between
                  mb-2
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
                    Due: {item.due}
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
                      "Completed"
                        ? "bg-black text-white"
                        : item.status ===
                          "Processing"
                        ? "border border-black text-black"
                        : "bg-zinc-200 text-zinc-700"
                    }
                  `}
                >
                  {item.status}
                </span>
              </div>

              {/* PROGRESS */}
              <div
                className="
                  h-2
                  rounded-full
                  bg-zinc-100
                  overflow-hidden
                "
              >
                <div
                  className="
                    h-full
                    bg-black
                    rounded-full
                  "
                  style={{
                    width: `${item.progress}%`,
                  }}
                />
              </div>

              {/* FOOTER */}
              <div
                className="
                  flex justify-between
                  mt-2
                "
              >
                <p
                  className="
                    text-[10px]
                    text-zinc-500
                  "
                >
                  Progress
                </p>

                <p
                  className="
                    text-[10px]
                    font-medium
                    text-zinc-700
                  "
                >
                  {item.progress}%
                </p>
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
          4 active compliance items
        </p>

        <p
          className="
            text-[10px]
            text-zinc-400
          "
        >
          Updated today
        </p>
      </div>
    </div>
  );
};

export default PayrollComplianceCard;