const payrollStatusData = [
  {
    id: 1,
    label: "Payroll Month",
    value: "May 2026",
  },

  {
    id: 2,
    label: "Processing Date",
    value: "28 May 2026",
  },

  {
    id: 3,
    label: "Salary Date",
    value: "31 May 2026",
  },

  {
    id: 4,
    label: "Approved By",
    value: "HR Manager",
  },

  {
    id: 5,
    label: "Bank Transfer",
    value: "Completed",
  },

  {
    id: 6,
    label: "Tax Deduction",
    value: "$18,240",
  },

  {
    id: 7,
    label: "Bonuses Added",
    value: "$12,500",
  },

  {
    id: 8,
    label: "Pending Review",
    value: "12 Employees",
  },
];

const PayrollStatusCard = () => {
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
      <div className="mb-4">
        <h3
          className="
            text-sm
            font-semibold
            text-zinc-800
          "
        >
          Payroll Status
        </h3>

        <p
          className="
            text-[11px]
            text-zinc-500
            mt-1
          "
        >
          Current payroll processing
        </p>
      </div>

      {/* STATUS LIST */}
      <div className="space-y-3 flex-1">
        {payrollStatusData.map((item) => (
          <div
            key={item.id}
            className="
              flex items-center justify-between
              gap-3
              border-b border-zinc-100
              pb-3
              last:border-none
              last:pb-0
            "
          >
            <span
              className="
                text-[11px]
                text-zinc-500
                whitespace-nowrap
              "
            >
              {item.label}
            </span>

            <span
              className="
                text-[11px]
                font-medium
                text-zinc-800
                text-right
              "
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayrollStatusCard;