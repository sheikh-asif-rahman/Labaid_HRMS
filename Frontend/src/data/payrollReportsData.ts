// ========================================
// src/data/payrollReportsData.ts
// ========================================

import {
  FileSpreadsheet,
  FileText,
  Printer,
  Download,
} from "lucide-react";

export const payrollReportsData = [
  {
    id: 1,
    title: "Monthly Payroll Report",
    subtitle:
      "Salary summary for all employees",
    date: "12 May 2026",
    status: "Ready",
  },

  {
    id: 2,
    title: "Tax Deduction Report",
    subtitle:
      "Tax and deduction analytics",
    date: "10 May 2026",
    status: "Processing",
  },

  {
    id: 3,
    title: "Attendance Impact Report",
    subtitle:
      "Payroll impact from attendance",
    date: "08 May 2026",
    status: "Ready",
  },

  {
    id: 4,
    title: "Bonus Distribution Report",
    subtitle:
      "Bonus payment records",
    date: "06 May 2026",
    status: "Pending",
  },
];

export const payrollExportData = [
  {
    id: 1,
    title: "Export CSV",
    icon: FileSpreadsheet,
  },

  {
    id: 2,
    title: "Export PDF",
    icon: FileText,
  },

  {
    id: 3,
    title: "Print Payroll",
    icon: Printer,
  },

  {
    id: 4,
    title: "Download Payslips",
    icon: Download,
  },
];