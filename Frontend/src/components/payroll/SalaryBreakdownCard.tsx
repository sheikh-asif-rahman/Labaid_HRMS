// ========================================
// src/components/payroll/SalaryBreakdownCard.tsx
// ========================================

import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { salaryBreakdownData } from "../../data/payrollPayslipData";

const SalaryBreakdownCard = () => {
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
          Salary Breakdown
        </h3>

        <p
          className="
            text-[10px]
            text-zinc-500
            mt-1
          "
        >
          Payroll distribution overview
        </p>
      </div>

      {/* CHART */}
      <div className="flex-1 min-h-[260px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={
              salaryBreakdownData
            }
          >
            <XAxis
              dataKey="title"
              tick={{
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
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
          Total categories: 5
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

export default SalaryBreakdownCard;