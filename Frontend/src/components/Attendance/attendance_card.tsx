import { AttendanceBranch } from "../../data/attendance_data";

interface AttendanceCardProps {
  data: AttendanceBranch;
}

const AttendanceCard = ({
  data,
}: AttendanceCardProps) => {
  const {
    branch,
    totalEmployees,
    present,
    absent,
    leave,
  } = data;

  const presentPercent =
    (present / totalEmployees) * 100;

  const absentPercent =
    (absent / totalEmployees) * 100;

  const leavePercent =
    (leave / totalEmployees) * 100;

  const circumference = 314;
  const radius = 50;

  const presentStroke =
    (presentPercent / 100) * circumference;

  const absentStroke =
    (absentPercent / 100) * circumference;

  const leaveStroke =
    (leavePercent / 100) * circumference;

  return (
    <div className="group rounded-3xl border border-neutral-800 bg-black p-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {branch}
          </h2>

          <p className="text-sm text-neutral-400">
            Total Employee: {totalEmployees}
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 120 70"
          className="h-44 w-44"
        >
          <path
            d="M 10 60 A 50 50 0 0 1 110 60"
            fill="none"
            stroke="#262626"
            strokeWidth="14"
            strokeLinecap="round"
          />

          <path
            d="M 10 60 A 50 50 0 0 1 110 60"
            fill="none"
            stroke="#ffffff"
            strokeWidth="14"
            strokeDasharray={`${presentStroke} ${circumference}`}
            strokeLinecap="round"
          />

          <path
            d="M 10 60 A 50 50 0 0 1 110 60"
            fill="none"
            stroke="#a3a3a3"
            strokeWidth="14"
            strokeDasharray={`${absentStroke} ${circumference}`}
            strokeDashoffset={-presentStroke}
            strokeLinecap="round"
          />

          <path
            d="M 10 60 A 50 50 0 0 1 110 60"
            fill="none"
            stroke="#525252"
            strokeWidth="14"
            strokeDasharray={`${leaveStroke} ${circumference}`}
            strokeDashoffset={
              -(presentStroke + absentStroke)
            }
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute top-[58%] flex flex-col items-center">
          <span className="text-3xl font-bold">
            {Math.round(presentPercent)}%
          </span>

          <span className="text-xs text-neutral-400">
            Present
          </span>
        </div>
      </div>

      <div className="mt-2 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-neutral-900 px-4 py-3 transition-all duration-300 hover:bg-white hover:text-black">
          <span>Present</span>

          <span className="font-semibold">
            {present}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-neutral-900 px-4 py-3 transition-all duration-300 hover:bg-neutral-300 hover:text-black">
          <span>Absent</span>

          <span className="font-semibold">
            {absent}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-neutral-900 px-4 py-3 transition-all duration-300 hover:bg-neutral-600">
          <span>Leave</span>

          <span className="font-semibold">
            {leave}
          </span>
        </div>
      </div>

      <div className="mt-5 border-t border-neutral-800 pt-4 text-sm text-neutral-400">
        Attendance Overview
      </div>
    </div>
  );
};

export default AttendanceCard;