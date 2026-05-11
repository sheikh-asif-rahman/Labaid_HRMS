// ========================================
// src/components/payroll/OvertimeTrendCard.tsx
// ========================================

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { overtimeTrendData } from "../../data/payrollAnalyticsData";

const OvertimeTrendCard = () => {
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
          Overtime Trend
        </h3>

        <p
          className="
            text-[10px]
            text-zinc-500
            mt-1
          "
        >
          Department overtime hours
        </p>
      </div>

      {/* CHART */}
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={overtimeTrendData}
          >
            <XAxis
              dataKey="department"
              tick={{
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="hours"
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
          Department overtime report
        </p>

        <p
          className="
            text-[10px]
            text-zinc-400
          "
        >
          Live analytics
        </p>
      </div>
    </div>
  );
};

export default OvertimeTrendCard;