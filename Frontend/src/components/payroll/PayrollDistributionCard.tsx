import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { payrollDepartmentData } from "../../data/payrollRowTwoData";

const PayrollDistributionCard = () => {
  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4
      "
    >
      <div className="mb-4">
        <h3
          className="
            text-sm
            font-semibold
            text-zinc-800
          "
        >
          Salary Distribution
        </h3>

        <p
          className="
            text-[11px]
            text-zinc-500
            mt-1
          "
        >
          Department allocation
        </p>
      </div>

      <div className="h-[180px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={payrollDepartmentData}
              dataKey="value"
              innerRadius={50}
              outerRadius={72}
              paddingAngle={2}
            >
              {payrollDepartmentData.map(
                (item, index) => (
                  <Cell
                    key={index}
                    fill={item.color}
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 mt-2">
        {payrollDepartmentData.map(
          (item, index) => (
            <div
              key={index}
              className="
                flex items-center justify-between
              "
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                <span
                  className="
                    text-[11px]
                    text-zinc-600
                  "
                >
                  {item.name}
                </span>
              </div>

              <span
                className="
                  text-[11px]
                  font-medium
                  text-zinc-800
                "
              >
                {item.value}%
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PayrollDistributionCard;