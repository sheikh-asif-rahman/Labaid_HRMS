import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: any[];
}

const ProductivityChart = ({ data }: Props) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-800">
            Productivity Overview
          </h2>

          <p className="text-[11px] text-zinc-500 mt-1">
            Monthly department comparison
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-[10px] text-zinc-500">
              HR
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-zinc-500">
              IT
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[10px] text-zinc-500">
              Sales
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-400" />
            <span className="text-[10px] text-zinc-500">
              Marketing
            </span>
          </div>
        </div>
      </div>

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

            <Tooltip
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #e4e4e7",
                fontSize: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="HR"
              stroke="#60a5fa"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
              }}
            />

            <Line
              type="monotone"
              dataKey="IT"
              stroke="#34d399"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
              }}
            />

            <Line
              type="monotone"
              dataKey="Sales"
              stroke="#fbbf24"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
              }}
            />

            <Line
              type="monotone"
              dataKey="Marketing"
              stroke="#f472b6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductivityChart;