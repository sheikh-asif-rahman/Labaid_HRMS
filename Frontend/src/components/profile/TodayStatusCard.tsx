import { todayStatusData } from "../../data/profileData";

const TodayStatusCard = () => {
  const percentage =
    (todayStatusData.workedMinutes /
      todayStatusData.totalMinutes) *
    100;

  const radius = 38;
  const stroke = 7;

  const normalizedRadius =
    radius - stroke / 2;

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (percentage / 100) * circumference;

  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-5
      "
    >
      {/* ROW 1 */}
      <div className="mb-4">
        <h3
          className="
            text-sm
            font-medium
            text-zinc-500
          "
        >
          Today
        </h3>
      </div>

      {/* ROW 2 */}
      <div
        className="
          flex items-center justify-between
          gap-4
          mb-5
        "
      >
        <div>
          <h2
            className="
              text-3xl
              font-bold
              text-zinc-800
              leading-none
            "
          >
            {todayStatusData.workedTime}
          </h2>

          <p
            className="
              text-sm
              text-zinc-500
              mt-2
            "
          >
            Working Hours
          </p>
        </div>

        <div
          className="
            relative
            w-24 h-24
            shrink-0
          "
        >
          <svg
            height="100%"
            width="100%"
            viewBox="0 0 100 100"
            className="-rotate-90"
          >
            <circle
              stroke="#e4e4e7"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="50"
              cy="50"
            />

            <circle
              stroke="#18181b"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              style={{
                strokeDashoffset,
              }}
              r={normalizedRadius}
              cx="50"
              cy="50"
            />
          </svg>

          <div
            className="
              absolute inset-0
              flex items-center justify-center
            "
          >
            <span
              className="
                text-sm
                font-semibold
                text-zinc-800
              "
            >
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* ROW 3 */}
      <div
        className="
          grid grid-cols-2 gap-4
          pt-4
          border-t border-zinc-200
        "
      >
        <div>
          <p
            className="
              text-xs
              text-zinc-500
              mb-1
            "
          >
            Punch In
          </p>

          <h4
            className="
              text-sm
              font-semibold
              text-zinc-800
            "
          >
            {todayStatusData.punchIn}
          </h4>
        </div>

        <div>
          <p
            className="
              text-xs
              text-zinc-500
              mb-1
            "
          >
            Expected Out
          </p>

          <h4
            className="
              text-sm
              font-semibold
              text-zinc-800
            "
          >
            {todayStatusData.expectedOut}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TodayStatusCard;