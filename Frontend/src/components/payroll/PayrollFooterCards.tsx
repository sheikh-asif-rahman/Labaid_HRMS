// ========================================
// src/components/payroll/PayrollFooterCards.tsx
// ========================================

import {
  payrollFooterData,
} from "../../data/payrollInsightsData";

const PayrollFooterCards = () => {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
      "
    >
      {payrollFooterData.map(
        (item) => (
          <div
            key={item.id}
            className="
              bg-white
              border border-zinc-200
              rounded-2xl
              p-4
            "
          >
            <h3
              className="
                text-xs
                font-semibold
                text-zinc-800
              "
            >
              {item.title}
            </h3>

            <p
              className="
                text-[11px]
                text-zinc-500
                mt-3
                leading-relaxed
              "
            >
              {item.value}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default PayrollFooterCards;