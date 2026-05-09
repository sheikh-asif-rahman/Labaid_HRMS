import {
  CheckCircle2,
  Clock3,
  XCircle,
  PauseCircle,
} from "lucide-react";

interface TableCardProps {
  title: string;
  columns?: string[];
  data: any[];
  type?: "default" | "meetings";
  textSize?: "normal" | "small";
}

const TableCard = ({
  title,
  columns,
  data,
  type = "default",
  textSize = "normal",
}: TableCardProps) => {
  const textClass =
    textSize === "small"
      ? "text-xs"
      : "text-sm";

  return (
    <div
      className="
        bg-white/80
        backdrop-blur-xl

        border border-white/40

        rounded-3xl

        p-5

        shadow-sm
      "
    >
      {/* HEADER */}
      <div className="mb-5">
        <h2
          className="
            text-lg
            font-semibold
            text-zinc-800
          "
        >
          {title}
        </h2>
      </div>

      {/* DEFAULT TABLE */}
      {type === "default" && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="
                  border-b
                  border-zinc-200
                "
              >
                {columns?.map(
                  (
                    column,
                    index
                  ) => (
                    <th
                      key={index}
                      className={`
                        text-left

                        py-3

                        font-medium

                        text-zinc-500

                        ${textClass}
                      `}
                    >
                      {column}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {data.map(
                (
                  row,
                  index
                ) => (
                  <tr
                    key={index}
                    className="
                      border-b
                      border-zinc-100
                    "
                  >
                    {Object.values(
                      row
                    ).map(
                      (
                        value,
                        i
                      ) => (
                        <td
                          key={i}
                          className={`
                            py-4

                            text-zinc-700

                            whitespace-nowrap

                            ${textClass}
                          `}
                        >
                          {String(
                            value
                          )}
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MEETINGS */}
      {type === "meetings" && (
        <div className="space-y-3">
          {data.map(
            (
              meeting,
              index
            ) => (
              <div
                key={index}
                className="
                  flex items-center
                  justify-between

                  gap-4

                  p-3

                  rounded-2xl

                  bg-zinc-50

                  hover:bg-zinc-100

                  transition-all
                "
              >
                {/* LEFT */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* DONE */}
                  {meeting.status ===
                    "Done" && (
                    <div
                      className="
                        w-10 h-10

                        rounded-2xl

                        bg-emerald-100
                        text-emerald-600

                        flex items-center
                        justify-center

                        shrink-0
                      "
                    >
                      <CheckCircle2 size={18} />
                    </div>
                  )}

                  {/* PENDING */}
                  {meeting.status ===
                    "Pending" && (
                    <div
                      className="
                        w-10 h-10

                        rounded-2xl

                        bg-zinc-200
                        text-zinc-500

                        flex items-center
                        justify-center

                        shrink-0
                      "
                    >
                      <Clock3 size={18} />
                    </div>
                  )}

                  {/* CANCELLED */}
                  {meeting.status ===
                    "Cancelled" && (
                    <div
                      className="
                        w-10 h-10

                        rounded-2xl

                        bg-red-100
                        text-red-600

                        flex items-center
                        justify-center

                        shrink-0
                      "
                    >
                      <XCircle size={18} />
                    </div>
                  )}

                  {/* POSTPONED */}
                  {meeting.status ===
                    "Postponed" && (
                    <div
                      className="
                        w-10 h-10

                        rounded-2xl

                        bg-yellow-100
                        text-yellow-600

                        flex items-center
                        justify-center

                        shrink-0
                      "
                    >
                      <PauseCircle size={18} />
                    </div>
                  )}

                  {/* TITLE */}
                  <h3
                    className={`
                      font-medium
                      text-zinc-800

                      truncate

                      ${textClass}
                    `}
                  >
                    {meeting.title}
                  </h3>
                </div>

                {/* DATE TIME */}
                <p
                  className={`
                    text-zinc-500

                    whitespace-nowrap

                    ${textClass}
                  `}
                >
                  {meeting.time}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default TableCard;