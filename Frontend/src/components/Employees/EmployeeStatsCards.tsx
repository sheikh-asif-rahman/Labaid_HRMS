import {
  Users,
  UserCheck,
  UserX,
  CalendarClock,
} from "lucide-react";

const stats = [
  {
    title: "Total Employees",
    value: "1,284",
    sub: "+12 this month",
    icon: Users,
  },
  {
    title: "Total Check In",
    value: "1,102",
    sub: "86% attendance",
    icon: UserCheck,
  },
  {
    title: "Total Absent",
    value: "42",
    sub: "3.2% absent",
    icon: UserX,
  },
  {
    title: "On Leave",
    value: "18",
    sub: "Approved leaves",
    icon: CalendarClock,
  },
];

export default function EmployeeStatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-black">
                  {item.value}
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {item.sub}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                <Icon size={20} className="text-black" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}