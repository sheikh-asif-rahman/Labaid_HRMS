import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useState } from "react";

interface Props {
  data: any[];
}

const shades = [
  "#000000",
  "#3f3f46",
  "#71717a",
  "#a1a1aa",
  "#d4d4d8",
];

const DepartmentDonutChart = ({
  data,
}: Props) => {
  const [activeIndex, setActiveIndex] =
    useState(0);

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 h-full">
      <h2 className="text-sm font-semibold text-zinc-800 mb-3">
        Department Presence
      </h2>

      {/* Chart */}
      <div className="h-[210px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Tooltip
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #e4e4e7",
                fontSize: "12px",
                background: "#fff",
              }}
              formatter={(value: any) => [
                value,
                "Employees",
              ]}
            />

            <Pie
              data={data}
              dataKey="value"
              innerRadius={58}
              outerRadius={78}
              paddingAngle={3}
              onMouseEnter={(_, index) =>
                setActiveIndex(index)
              }
              onClick={(_, index) =>
                setActiveIndex(index)
              }
            >
              {data.map((item, index) => {
                const isActive =
                  activeIndex === index;

                return (
                  <Cell
                    key={index}
                    fill={
                      isActive
                        ? "#000000"
                        : shades[
                            Math.min(
                              index + 1,
                              shades.length - 1
                            )
                          ]
                    }
                    style={{
                      cursor: "pointer",
                      transition:
                        "all .2s ease",
                      opacity: isActive
                        ? 1
                        : 0.9,
                    }}
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-2 mt-2">
        {data.map((item, index) => {
          const isActive =
            activeIndex === index;

          return (
            <button
              key={index}
              onClick={() =>
                setActiveIndex(index)
              }
              onMouseEnter={() =>
                setActiveIndex(index)
              }
              className="w-full flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background: isActive
                      ? "#000"
                      : shades[
                          Math.min(
                            index + 1,
                            shades.length - 1
                          )
                        ],
                  }}
                />

                <span
                  className={`text-[11px] transition-all ${
                    isActive
                      ? "text-black font-medium"
                      : "text-zinc-500"
                  }`}
                >
                  {item.name}
                </span>
              </div>

              <span
                className={`text-[11px] transition-all ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-zinc-500"
                }`}
              >
                {item.value}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentDonutChart;