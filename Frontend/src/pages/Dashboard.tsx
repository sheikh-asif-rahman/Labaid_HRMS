import SmallStatCard from "../components/dashboard/SmallStatCard";
import ProductivityChart from "../components/dashboard/ProductivityChart";
import DepartmentDonutChart from "../components/dashboard/DepartmentDonutChart";
import TableCard from "../components/dashboard/TableCard";

import {
  statsData,
  productivityData,
  donutData,
  applicationsData,
  meetingsData,
} from "../data/dashboardData";

const DashboardPage = () => {
  return (
    <div
      className="
        min-h-screen

        bg-gradient-to-br
        from-zinc-100
        via-slate-100
        to-blue-50

        p-5 md:p-8

        space-y-6
      "
    >
      {/* STATS */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4

          gap-6
        "
      >
        {statsData.map((item, index) => (
          <SmallStatCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      {/* CHARTS */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3

          gap-6
        "
      >
        {/* PRODUCTIVITY */}
        <div className="xl:col-span-2">
          <ProductivityChart
            data={productivityData}
          />
        </div>

        {/* DONUT */}
        <DepartmentDonutChart
          data={donutData}
        />
      </div>

      {/* TABLES */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-5

          gap-6
        "
      >
        {/* APPLICATIONS */}
        <div className="xl:col-span-3">
          <TableCard
            title="Applications"
            columns={[
              "ID",
              "Name",
              "Topic",
              "Status",
            ]}
            data={applicationsData}
            textSize="small"
          />
        </div>

        {/* MEETINGS */}
        <div className="xl:col-span-2">
          <TableCard
            title="Meetings"
            data={meetingsData}
            type="meetings"
            textSize="small"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;