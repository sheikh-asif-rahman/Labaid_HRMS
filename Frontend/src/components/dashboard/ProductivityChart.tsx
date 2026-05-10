import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useState } from "react";

interface Props {
  data: any[];
}

const lines = [
  {
    key: "HR",
    label: "HR",
  },
  {
    key: "IT",
    label: "IT",
  },
  {
    key: "Sales",
    label: "Sales",
  },
  {
    key: "Marketing",
    label: "Marketing",
  },
];

const ProductivityChart = ({ data }: Props) => {
  const [activeLine, setActiveLine] =
    useState<string>("HR");

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h2 className="text-sm font-semibold text-zinc-800">
            Productivity Overview
          </h2>

        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          {lines.map((item) => {
            const isActive =
              activeLine === item.key;

            return (
              <button
                key={item.key}
                onClick={() =>
                  setActiveLine(item.key)
                }
                onMouseEnter={() =>
                  setActiveLine(item.key)
                }
                className="flex items-center gap-2 transition-all"
              >
                <div
                  className={`
                    w-2 h-2 rounded-full transition-all duration-200
                    ${
                      isActive
                        ? "bg-black"
                        : "bg-zinc-400"
                    }
                  `}
                />

                <span
                  className={`
                    text-[10px] transition-all duration-200
                    ${
                      isActive
                        ? "text-black font-medium"
                        : "text-zinc-500"
                    }
                  `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 11,
                fill: "#71717a",
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fontSize: 11,
                fill: "#71717a",
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                stroke: "#d4d4d8",
                strokeWidth: 1,
              }}
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #e4e4e7",
                fontSize: "12px",
                background: "#fff",
              }}
              labelStyle={{
                fontWeight: 600,
                color: "#18181b",
              }}
            />

            {lines.map((line) => {
              const isActive =
                activeLine === line.key;

              return (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  stroke={
                    isActive
                      ? "#000000"
                      : "#d4d4d8"
                  }
                  strokeWidth={
                    isActive ? 3 : 2
                  }
                  dot={
                    isActive
                      ? {
                          r: 3,
                          fill: "#000",
                          strokeWidth: 0,
                        }
                      : false
                  }
                  activeDot={false}
                  onMouseEnter={() =>
                    setActiveLine(line.key)
                  }
                  onClick={() =>
                    setActiveLine(line.key)
                  }
                  style={{
                    cursor: "pointer",
                    transition:
                      "all .2s ease",
                  }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductivityChart;