// ========================================
// src/data/payrollInsightsData.ts
// ========================================

export const topPaidEmployeesData = [
  {
    id: 1,
    name: "Emma Watson",
    department: "Finance",
    salary: "$8,400",
    growth: "+12%",
  },

  {
    id: 2,
    name: "Michael Lee",
    department: "Engineering",
    salary: "$7,950",
    growth: "+9%",
  },

  {
    id: 3,
    name: "Sophia Taylor",
    department: "HR",
    salary: "$7,300",
    growth: "+7%",
  },

  {
    id: 4,
    name: "David Miller",
    department: "Sales",
    salary: "$6,900",
    growth: "+5%",
  },

  {
    id: 5,
    name: "Sarah Khan",
    department: "Operations",
    salary: "$6,500",
    growth: "+4%",
  },
];

export const payrollAlertsData = [
  {
    id: 1,
    title: "High overtime detected",
    subtitle:
      "Engineering exceeded monthly overtime limit.",
    status: "Warning",
  },

  {
    id: 2,
    title: "Pending salary approval",
    subtitle:
      "Finance approval still pending for May payroll.",
    status: "Pending",
  },

  {
    id: 3,
    title: "Tax mismatch found",
    subtitle:
      "2 employees have incorrect tax deductions.",
    status: "Critical",
  },

  {
    id: 4,
    title: "Failed payroll transfer",
    subtitle:
      "One bank transfer failed during payout.",
    status: "Critical",
  },
];

export const payrollFooterData = [
  {
    id: 1,
    title: "Payroll Notes",
    value:
      "Salary processing completed for 82% employees.",
  },

  {
    id: 2,
    title: "Last Sync",
    value:
      "Attendance synced 12 minutes ago.",
  },

  {
    id: 3,
    title: "System Health",
    value:
      "All payroll services running normally.",
  },
];