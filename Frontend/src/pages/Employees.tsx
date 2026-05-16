import { useState } from "react";

import EmployeeToolbar from "../components/Employees/EmployeeToolbar";
import EmployeeStatsCards from "../components/Employees/EmployeeStatsCards";
import EmployeeTable from "../components/Employees/Employee-table";

const Employees = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-5">

      {/* ROW 1: TOOLBAR */}
      <EmployeeStatsCards />
      {/* ROW 2: STATS */}
      <EmployeeToolbar
        search={search}
        setSearch={setSearch}
      />


      {/* ROW 3: TABLE */}
      <EmployeeTable search={search} />

    </div>
  );
};

export default Employees;