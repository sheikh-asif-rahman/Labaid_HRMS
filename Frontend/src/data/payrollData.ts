import {
  Wallet,
  Users,
  Clock3,
  FileText,
  Download,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";

export const payrollSummaryData = [
  {
    id: 1,
    title: "Total Payroll",
    value: "$248,500",
    subtitle: "This Month",
    icon: Wallet,
  },

  {
    id: 2,
    title: "Paid Employees",
    value: "184",
    subtitle: "Completed",
    icon: Users,
  },

  {
    id: 3,
    title: "Pending Payroll",
    value: "12",
    subtitle: "Need Approval",
    icon: Clock3,
  },
];

export const payrollQuickActionsData = [
  {
    id: 1,
    title: "Generate Payroll",
    icon: PlusCircle,
  },

  {
    id: 2,
    title: "Download Payslip",
    icon: Download,
  },

  {
    id: 3,
    title: "Approve Salary",
    icon: CheckCircle2,
  },

  {
    id: 4,
    title: "Payroll Reports",
    icon: FileText,
  },
];