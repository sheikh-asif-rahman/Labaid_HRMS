import { attendanceOverviewData } from "../../data/profileData";

const AttendanceOverviewCard = () => {
  const total = attendanceOverviewData.reduce(
    (acc, item) => acc + item.value,
    0
  );

  const fullDay =
    attendanceOverviewData.find(
      (item) => item.name === "Full Day"
    )?.value || 0;

  const attendancePercent = Math.round(
    (fullDay / total) * 100
  );

  let cumulativePercent = 0;

  const createArc = (
    startPercent: number,
    endPercent: number,
    color: string
  ) => {
    const radius = 42;

    const strokeWidth = 10;

    const startAngle =
      2 * Math.PI * startPercent -
      Math.PI / 2;

    const endAngle =
      2 * Math.PI * endPercent -
      Math.PI / 2;

    const x1 =
      50 + radius * Math.cos(startAngle);

    const y1 =
      50 + radius * Math.sin(startAngle);

    const x2 =
      50 + radius * Math.cos(endAngle);

    const y2 =
      50 + radius * Math.sin(endAngle);

    const largeArcFlag =
      endPercent - startPercent > 0.5
        ? 1
        : 0;

    return (
      <path
        d={`
          M ${x1} ${y1}
          A ${radius} ${radius}
          0 ${largeArcFlag} 1
          ${x2} ${y2}
        `}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );
  };

  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-5
      "
    >
      {/* TITLE */}
      <div className="mb-5">
        <h3
          className="
            text-sm
            font-medium
            text-zinc-500
          "
        >
          My Attendance
        </h3>
      </div>

      <div
        className="
          flex items-center justify-between
          gap-5
        "
      >
        {/* LEFT */}
        <div className="space-y-3 flex-1">
          {attendanceOverviewData.map(
            (item) => (
              <div
                key={item.name}
                className="
                  flex items-center
                  justify-between
                "
              >
                <div
                  className="
                    flex items-center gap-2
                  "
                >
                  <div
                    className="
                      w-2.5 h-2.5
                      rounded-full
                    "
                    style={{
                      backgroundColor:
                        item.color,
                    }}
                  />

                  <span
                    className="
                      text-sm
                      text-zinc-600
                    "
                  >
                    {item.name}
                  </span>
                </div>

                <span
                  className="
                    text-sm
                    font-medium
                    text-zinc-800
                  "
                >
                  {item.value}
                </span>
              </div>
            )
          )}
        </div>

        {/* CHART */}
        <div
          className="
            relative
            w-32 h-32
            shrink-0
          "
        >
          <svg
            viewBox="0 0 100 100"
            className="-rotate-90"
          >
            {attendanceOverviewData.map(
              (item) => {
                const start =
                  cumulativePercent;

                const itemPercent =
                  item.value / total;

                cumulativePercent +=
                  itemPercent;

                const end =
                  cumulativePercent;

                return createArc(
                  start,
                  end,
                  item.color
                );
              }
            )}
          </svg>

          <div
            className="
              absolute inset-0
              flex items-center justify-center
            "
          >
            <div className="text-center">
              <h4
                className="
                  text-xl
                  font-bold
                  text-zinc-800
                "
              >
                {attendancePercent}%
              </h4>

              <p
                className="
                  text-xs
                  text-zinc-500
                "
              >
                Present
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverviewCard;