// ========================================
// src/components/payroll/PayrollTrendCard.tsx
// ========================================

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { payrollTrendData } from "../../data/payrollAnalyticsData";

const PayrollTrendCard = () => {
  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4
        h-full
        flex flex-col
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          flex items-start justify-between
          gap-4
          mb-5
        "
      >
        <div>
          <h3
            className="
              text-sm
              font-semibold
              text-zinc-800
            "
          >
            Monthly Payroll Trend
          </h3>

          <p
            className="
              text-[10px]
              text-zinc-500
              mt-1
            "
          >
            Payroll expenses overview
          </p>
        </div>

        {/* MINI STATS */}
        <div
          className="
            text-right
            shrink-0
          "
        >
          <h4
            className="
              text-lg
              font-bold
              text-zinc-800
              leading-none
            "
          >
            $53K
          </h4>

          <p
            className="
              text-[10px]
              text-zinc-500
              mt-1
            "
          >
            +12.4% Growth
          </p>
        </div>
      </div>

      {/* CHART */}
      <div className="flex-1 min-h-[340px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={payrollTrendData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            {/* GRADIENT */}
            <defs>
              <linearGradient
                id="payrollGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#000"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="#000"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            {/* GRID */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e4e4e7"
            />

            {/* X */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "#71717a",
              }}
            />

            {/* Y */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "#71717a",
              }}
            />

            {/* TOOLTIP */}
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border:
                  "1px solid #e4e4e7",
                fontSize: 12,
              }}
            />

            {/* AREA */}
            <Area
              type="monotone"
              dataKey="payroll"
              stroke="#000"
              strokeWidth={3}
              fill="url(#payrollGradient)"
              dot={{
                r: 0,
              }}
              activeDot={{
                r: 6,
                strokeWidth: 0,
                fill: "#000",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* FOOTER */}
      <div
        className="
          mt-4
          pt-4
          border-t border-zinc-200
          grid
          grid-cols-3
          gap-3
        "
      >
        <div>
          <p
            className="
              text-[10px]
              text-zinc-500
            "
          >
            Highest
          </p>

          <h5
            className="
              text-xs
              font-semibold
              text-zinc-800
              mt-1
            "
          >
            $53,000
          </h5>
        </div>

        <div>
          <p
            className="
              text-[10px]
              text-zinc-500
            "
          >
            Average
          </p>

          <h5
            className="
              text-xs
              font-semibold
              text-zinc-800
              mt-1
            "
          >
            $47,900
          </h5>
        </div>

        <div>
          <p
            className="
              text-[10px]
              text-zinc-500
            "
          >
            Forecast
          </p>

          <h5
            className="
              text-xs
              font-semibold
              text-zinc-800
              mt-1
            "
          >
            +8.2%
          </h5>
        </div>
      </div>
    </div>
  );
};

export default PayrollTrendCard;