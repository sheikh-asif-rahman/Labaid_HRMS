import PayrollSummaryCard from "../components/payroll/PayrollSummaryCard";

import PayrollStatusCard from "../components/payroll/PayrollStatusCard";

import PayrollDistributionCard from "../components/payroll/PayrollDistributionCard";

import PayrollActivityCard from "../components/payroll/PayrollActivityCard";

import PayrollTableCard from "../components/payroll/PayrollTableCard";

import { payrollSummaryData } from "../data/payrollData";
import PayrollCalendarCard from "../components/payroll/PayrollCalendarCard";
import PayrollTasksCard from "../components/payroll/PayrollTasksCard";
import PayslipDownloadsCard from "../components/payroll/PayslipDownloadsCard";
import SalaryBreakdownCard from "../components/payroll/SalaryBreakdownCard";
import PayrollTimelineCard from "../components/payroll/PayrollTimelineCard";
import PayrollComplianceCard from "../components/payroll/PayrollComplianceCard";
import PayrollTrendCard from "../components/payroll/PayrollTrendCard";
import OvertimeTrendCard from "../components/payroll/OvertimeTrendCard";
import PayrollReportsCard from "../components/payroll/PayrollReportsCard";
import PayrollExportCard from "../components/payroll/PayrollExportCard";
import TopPaidEmployeesCard from "../components/payroll/TopPaidEmployeesCard";
import PayrollAlertsCard from "../components/payroll/PayrollAlertsCard";
import PayrollFooterCards from "../components/payroll/PayrollFooterCards";

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
              <div key={item.id} className="flex-1">
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

        {/* COLUMN 2 - SALARY DISTRIBUTION */}
        <div className="h-full">
          <PayrollDistributionCard />
        </div>

        {/* COLUMN 3 - RECENT ACTIVITY */}
        <div className="h-full">
          <PayrollActivityCard />
        </div>
      </div>

      {/* ROW 2 */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[minmax(0,1fr)_320px]
          gap-4
          items-start
        "
      >
        {/* TABLE */}
        <PayrollTableCard />

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          <PayrollStatusCard />
        </div>
      </div>
      {/* ROW 3 */}
      <div
        className="
    grid
    grid-cols-1
    xl:grid-cols-2
    gap-4
    items-start
  "
      >
        <PayrollCalendarCard />

        <PayrollTasksCard />
      </div>
      {/* ROW 4 */}
      <div
        className="
    grid
    grid-cols-1
    xl:grid-cols-[minmax(0,1fr)_340px]
    gap-4
    items-stretch
  "
      >
        <PayslipDownloadsCard />

        <SalaryBreakdownCard />
      </div>
      {/* ROW 5 */}
      <div
        className="
    grid
    grid-cols-1
    xl:grid-cols-[minmax(0,1fr)_340px]
    gap-4
    items-stretch
  "
      >
        <PayrollTimelineCard />

        <PayrollComplianceCard />
      </div>
      {/* ROW 6 */}
      <div
        className="
    grid
    grid-cols-1
    xl:grid-cols-[minmax(0,1fr)_340px]
    gap-4
    items-stretch
  "
      >
        <PayrollTrendCard />

        <OvertimeTrendCard />
      </div>
      {/* ROW 7 */}
      <div
        className="
    grid
    grid-cols-1
    xl:grid-cols-[minmax(0,1fr)_340px]
    gap-4
    items-stretch
  "
      >
        <PayrollReportsCard />

        <PayrollExportCard />
      </div>
      {/* ROW 8 */}
      <div
        className="
    grid
    grid-cols-1
    xl:grid-cols-[minmax(0,1fr)_340px]
    gap-4
    items-stretch
  "
      >
        <TopPaidEmployeesCard />

        <PayrollAlertsCard />
      </div>

      {/* ROW 9 */}
      <PayrollFooterCards />
    </div>
  );
};

export default Payroll;
