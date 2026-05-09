import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any[];
}

const DepartmentDonutChart = ({
  data,
}: Props) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4">
      <h2 className="text-sm font-semibold text-zinc-800 mb-3">
        Department Presence
      </h2>

      <div className="h-[210px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={58}
              outerRadius={78}
              paddingAngle={2}
            >
              {data.map((item, index) => (
                <Cell
                  key={index}
                  fill={item.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 mt-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: item.color,
                }}
              />

              <span className="text-[11px] text-zinc-600">
                {item.name}
              </span>
            </div>

            <span className="text-[11px] font-medium text-zinc-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentDonutChart;