import {
  Clock3,
  AlarmClock,
  TimerReset,
  LogOut,
} from "lucide-react";

export const todayStatusData = {
  workedMinutes: 310,
  totalMinutes: 480,

  workedTime: "05h 10m",

  punchIn: "09:12 AM",

  expectedOut: "06:00 PM",
};

export const profileStatsData = [
  {
    id: 1,
    title: "Average Hour",
    value: "10h 12m",
    icon: Clock3,
  },

  {
    id: 2,
    title: "Average Check In",
    value: "09:08 AM",
    icon: AlarmClock,
  },

  {
    id: 3,
    title: "On Time Arrival",
    value: "90%",
    icon: TimerReset,
  },

  {
    id: 4,
    title: "Average Check Out",
    value: "07:14 PM",
    icon: LogOut,
  },
];

export const attendanceOverviewData = [
  {
    name: "Full Day",
    value: 220,
    color: "#18181b",
  },

  {
    name: "Half Day",
    value: 12,
    color: "#52525b",
  },

  {
    name: "Absent",
    value: 7,
    color: "#a1a1aa",
  },

  {
    name: "Leave",
    value: 18,
    color: "#d4d4d8",
  },
];