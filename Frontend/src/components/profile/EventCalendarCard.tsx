import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

import { useMemo, useState } from "react";

import { calendarEvents } from "../../data/calendarData";

const days = [
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
  "Su",
];

const EventCalendarCard = () => {
  const [currentDate, setCurrentDate] =
    useState(new Date());

  const month = currentDate.getMonth();

  const year = currentDate.getFullYear();

  const monthName =
    currentDate.toLocaleString("default", {
      month: "long",
    });

  const firstDay = new Date(
    year,
    month,
    1
  );

  const lastDay = new Date(
    year,
    month + 1,
    0
  );

  const totalDays = lastDay.getDate();

  let startDay =
    firstDay.getDay() - 1;

  if (startDay < 0) startDay = 6;

  const calendarDays = [];

  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }

  for (
    let day = 1;
    day <= totalDays;
    day++
  ) {
    calendarDays.push(day);
  }

  const monthEvents = useMemo(() => {
    return calendarEvents.filter((event) => {
      const eventDate = new Date(
        event.date
      );

      return (
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  }, [month, year]);

  const eventDates = monthEvents.map(
    (event) =>
      new Date(event.date).getDate()
  );

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="
              w-10 h-10
              rounded-xl
              bg-zinc-100
              flex items-center justify-center
            "
          >
            <CalendarDays
              size={17}
              className="text-black"
            />
          </div>

          <div>
            <h2
              className="
                text-sm
                font-semibold
                text-black
              "
            >
              Calendar
            </h2>

            <p
              className="
                text-[11px]
                text-zinc-500
                mt-0.5
              "
            >
              Events & holidays
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="
              w-8 h-8
              rounded-lg
              border border-zinc-200
              flex items-center justify-center
              hover:bg-black
              hover:text-white
              transition-all
            "
          >
            <ChevronLeft size={14} />
          </button>

          <button
            onClick={handleNextMonth}
            className="
              w-8 h-8
              rounded-lg
              border border-zinc-200
              flex items-center justify-center
              hover:bg-black
              hover:text-white
              transition-all
            "
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          flex flex-col
          lg:flex-row
          gap-4
        "
      >
        {/* CALENDAR */}
        <div className="flex-1 min-w-0">
          {/* MONTH */}
          <div className="mb-3">
            <h3
              className="
                text-sm
                font-semibold
                text-black
              "
            >
              {monthName} {year}
            </h3>
          </div>

          {/* DAYS */}
          <div className="grid grid-cols-7 mb-2">
            {days.map((day) => (
              <div
                key={day}
                className="
                  text-center
                  text-[10px]
                  text-zinc-400
                  py-1
                "
              >
                {day}
              </div>
            ))}
          </div>

          {/* DATES */}
          <div className="grid grid-cols-7 gap-y-1">
            {calendarDays.map(
              (date, index) => {
                const isEvent =
                  eventDates.includes(
                    Number(date)
                  );

                return (
                  <div
                    key={index}
                    className="
                      h-8
                      flex items-center justify-center
                    "
                  >
                    {date && (
                      <button
                        className="
                          relative
                          w-8 h-8
                          rounded-full
                          flex items-center justify-center
                          text-[11px]
                          hover:bg-zinc-100
                          transition-all
                        "
                      >
                        {isEvent && (
                          <div
                            className="
                              absolute inset-0
                              rounded-full
                              bg-black
                            "
                          />
                        )}

                        <span
                          className={`
                            relative z-10
                            ${
                              isEvent
                                ? "text-white font-medium"
                                : "text-zinc-700"
                            }
                          `}
                        >
                          {date}
                        </span>
                      </button>
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
            lg:w-[180px]
            lg:border-l
            lg:border-zinc-200
            lg:pl-4
            pt-4
            lg:pt-0
            border-t
            lg:border-t-0
            border-zinc-200
            space-y-2
          "
        >
          {monthEvents.length > 0 ? (
            monthEvents.map((item) => (
              <div
                key={item.id}
                className="
                  flex items-start gap-2
                "
              >
                <div
                  className="
                    w-2 h-2
                    rounded-full
                    bg-black
                    mt-1.5
                    shrink-0
                  "
                />

                <div className="min-w-0">
                  <p
                    className="
                      text-[11px]
                      font-medium
                      text-black
                      leading-tight
                    "
                  >
                    {item.title}
                  </p>

                  <span
                    className="
                      text-[10px]
                      text-zinc-400
                    "
                  >
                    {new Date(
                      item.date
                    ).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                      }
                    )}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p
              className="
                text-[11px]
                text-zinc-400
              "
            >
              No events this month
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCalendarCard;