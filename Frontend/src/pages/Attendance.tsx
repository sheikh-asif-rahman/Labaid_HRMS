import AttendanceCard from "../components/Attendance/attendance_card";

import { attendanceData } from "../data/attendance_data";

const Attendance = () => {
  return (
    <div className="space-y-6">
      <div
        className="
          flex items-center justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-zinc-800
            "
          >
            Attendance Overview
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-zinc-500
            "
          >
            Branch wise employee attendance summary
          </p>
        </div>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          2xl:grid-cols-3
        "
      >
        {attendanceData.map((item) => (
          <AttendanceCard
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Attendance;