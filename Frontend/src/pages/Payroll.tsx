import PayrollSummaryCard from "../components/payroll/PayrollSummaryCard";

import PayrollStatusCard from "../components/payroll/PayrollStatusCard";

import PayrollQuickActions from "../components/payroll/PayrollQuickActions";

import { payrollSummaryData } from "../data/payrollData";

const Payroll = () => {
  return (
    <div className="space-y-4">
      {/* ROW 1 */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-4
          items-stretch
        "
      >
        {/* COLUMN 1 - SUMMARY */}
        <div
          className="
            flex flex-col
            gap-4
            h-full
          "
        >
          {payrollSummaryData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="flex-1"
              >
                <PayrollSummaryCard
                  title={item.title}
                  value={item.value}
                  subtitle={item.subtitle}
                  icon={<Icon size={18} />}
                />
              </div>
            );
          })}
        </div>

        {/* COLUMN 2 - STATUS */}
        <div className="h-full">
          <PayrollStatusCard />
        </div>

        {/* COLUMN 3 - QUICK ACTION */}
        <div className="h-full">
          <PayrollQuickActions />
        </div>
      </div>
    </div>
  );
};

export default Payroll;