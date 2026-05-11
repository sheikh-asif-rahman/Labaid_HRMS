// ========================================
// src/components/payroll/PayrollCalendarCard.tsx
// ========================================

import { useMemo, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  payrollEventsData,
} from "../../data/payrollRowThreeData";

const PayrollCalendarCard = () => {
  // ========================================
  // STATE
  // ========================================

  const [currentDate, setCurrentDate] =
    useState(new Date());

  const month =
    currentDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    );

  const year =
    currentDate.getFullYear();

  // ========================================
  // MONTH CHANGE
  // ========================================

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(
        year,
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(
        year,
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  // ========================================
  // CALENDAR DAYS
  // ========================================

  const calendarDays = useMemo(() => {
    const firstDay =
      new Date(
        year,
        currentDate.getMonth(),
        1
      ).getDay();

    const totalDays =
      new Date(
        year,
        currentDate.getMonth() + 1,
        0
      ).getDate();

    const days = [];

    // EMPTY
    for (
      let i = 0;
      i < firstDay;
      i++
    ) {
      days.push(null);
    }

    // DAYS
    for (
      let day = 1;
      day <= totalDays;
      day++
    ) {
      days.push(day);
    }

    return days;
  }, [currentDate, year]);

  // ========================================
  // ACTIVE DAYS
  // ========================================

  const activeDays = [
    3, 10, 18, 25,
  ];

  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4
        h-full
        flex flex-col
      "
    >
      {/* HEADER */}
      <div
        className="
          flex items-center justify-between
          mb-4
          shrink-0
        "
      >
        <div>
          <h3
            className="
              text-sm
              font-semibold
              text-zinc-800
            "
          >
            Payroll Calendar
          </h3>

          <p
            className="
              text-[10px]
              text-zinc-500
              mt-1
            "
          >
            {month} {year}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-2">
          <button
            onClick={
              handlePrevMonth
            }
            className="
              h-8 w-8
              rounded-xl
              border border-zinc-200
              flex items-center justify-center
              hover:bg-zinc-100
              transition-all
              shrink-0
            "
          >
            <ChevronLeft
              size={14}
            />
          </button>

          <button
            onClick={
              handleNextMonth
            }
            className="
              h-8 w-8
              rounded-xl
              border border-zinc-200
              flex items-center justify-center
              hover:bg-zinc-100
              transition-all
              shrink-0
            "
          >
            <ChevronRight
              size={14}
            />
          </button>
        </div>
      </div>

      {/* BODY */}
      <div
        className="
          flex-1
          grid
          grid-cols-1
          lg:grid-cols-[220px_minmax(0,1fr)]
          gap-4
          items-start
        "
      >
        {/* CALENDAR */}
        <div className="flex flex-col h-full">
          {/* WEEK */}
          <div
            className="
              grid grid-cols-7
              gap-1
              mb-2
            "
          >
            {[
              "S",
              "M",
              "T",
              "W",
              "T",
              "F",
              "S",
            ].map((day) => (
              <div
                key={day}
                className="
                  text-center
                  text-[9px]
                  text-zinc-400
                  font-medium
                "
              >
                {day}
              </div>
            ))}
          </div>

          {/* DAYS */}
          <div
            className="
              grid grid-cols-7
              gap-1
              flex-1
              content-start
            "
          >
            {calendarDays.map(
              (day, index) => {
                const isActive =
                  activeDays.includes(
                    Number(day)
                  );

                const isToday =
                  day ===
                    new Date().getDate() &&
                  currentDate.getMonth() ===
                    new Date().getMonth() &&
                  year ===
                    new Date().getFullYear();

                return (
                  <div
                    key={index}
                    className="
                      flex items-center justify-center
                    "
                  >
                    {day ? (
                      <button
                        className={`
                          h-7 w-7
                          rounded-lg
                          text-[10px]
                          font-medium
                          transition-all
                          relative
                          flex items-center justify-center

                          ${
                            isActive
                              ? "bg-black text-white"
                              : isToday
                              ? "border border-black text-black"
                              : "text-zinc-700 hover:bg-zinc-100"
                          }
                        `}
                      >
                        {day}

                        {isActive && (
                          <span
                            className="
                              absolute
                              -bottom-0.5
                              h-1 w-1
                              rounded-full
                              bg-white
                            "
                          />
                        )}
                      </button>
                    ) : (
                      <div className="h-7 w-7" />
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* EVENTS */}
        <div
          className="
            flex flex-col
            justify-between
            h-full
            space-y-3
            lg:border-l lg:border-zinc-200
            lg:pl-4
          "
        >
          <div className="space-y-3">
            {payrollEventsData.map(
              (item) => (
                <div
                  key={item.id}
                  className="
                    flex items-start justify-between
                    gap-3
                  "
                >
                  <div className="flex gap-2.5">
                    <div
                      className="
                        w-1.5 h-1.5
                        rounded-full
                        bg-black
                        mt-1.5
                        shrink-0
                      "
                    />

                    <div>
                      <h4
                        className="
                          text-[11px]
                          font-medium
                          text-zinc-800
                          leading-none
                        "
                      >
                        {item.title}
                      </h4>

                      <p
                        className="
                          text-[10px]
                          text-zinc-500
                          mt-1
                        "
                      >
                        {item.time}
                      </p>
                    </div>
                  </div>

                  <span
                    className="
                      text-[10px]
                      text-zinc-400
                      whitespace-nowrap
                    "
                  >
                    {item.date}
                  </span>
                </div>
              )
            )}
          </div>

          {/* FOOTER */}
          <div
            className="
              pt-3
              border-t border-zinc-200
              flex items-center justify-between
            "
          >
            <p
              className="
                text-[10px]
                text-zinc-500
              "
            >
              {payrollEventsData.length}{" "}
              events
            </p>

            <p
              className="
                text-[10px]
                text-zinc-400
              "
            >
              Payroll Schedule
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollCalendarCard;