// ========================================
// src/data/payrollRowThreeData.ts
// ========================================

export const payrollCalendarDays = [
  { day: 1, active: false },
  { day: 2, active: false },
  { day: 3, active: true },
  { day: 4, active: false },
  { day: 5, active: false },
  { day: 6, active: true },
  { day: 7, active: false },

  { day: 8, active: false },
  { day: 9, active: false },
  { day: 10, active: true },
  { day: 11, active: false },
  { day: 12, active: false },
  { day: 13, active: false },
  { day: 14, active: true },

  { day: 15, active: false },
  { day: 16, active: false },
  { day: 17, active: false },
  { day: 18, active: true },
  { day: 19, active: false },
  { day: 20, active: false },
  { day: 21, active: false },

  { day: 22, active: true },
  { day: 23, active: false },
  { day: 24, active: false },
  { day: 25, active: true },
  { day: 26, active: false },
  { day: 27, active: false },
  { day: 28, active: false },

  { day: 29, active: true },
  { day: 30, active: false },
];

export const payrollEventsData = [
  {
    id: 1,
    title: "Payroll Generation",
    date: "03 May",
    time: "10:00 AM",
  },

  {
    id: 2,
    title: "Tax Submission",
    date: "10 May",
    time: "02:30 PM",
  },

  {
    id: 3,
    title: "Payslip Release",
    date: "18 May",
    time: "11:00 AM",
  },

  {
    id: 4,
    title: "Salary Transfer",
    date: "25 May",
    time: "09:00 AM",
  },
];

export const payrollTasksData = [
  {
    id: 1,
    title: "Approve Payroll",
    subtitle:
      "Finance department approval pending",
    status: "Pending",
  },

  {
    id: 2,
    title: "Verify Overtime",
    subtitle:
      "Engineering overtime calculation",
    status: "Review",
  },

  {
    id: 3,
    title: "Generate Payslips",
    subtitle:
      "Prepare employee salary slips",
    status: "Ready",
  },

  {
    id: 4,
    title: "Tax Submission",
    subtitle:
      "Government filing deadline",
    status: "Urgent",
  },
];