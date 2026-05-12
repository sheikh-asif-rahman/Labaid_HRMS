import { useState } from "react";
import EmployeeStatsCards from "../components/Employees/EmployeeStatsCards";
import EmployeeToolbar from "../components/Employees/EmployeeToolbar";


const Employees = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-5">
      <EmployeeToolbar
        search={search}
        setSearch={setSearch}
      />

      <EmployeeStatsCards />

      <div
        className="
          bg-white
          border border-zinc-200
          rounded-2xl
          h-[400px]
          flex items-center justify-center
        "
      >
        <h1
          className="
            text-2xl
            font-bold
            text-zinc-800
          "
        >
          Employees Page
        </h1>
      </div>
    </div>
  );
};

export default Employees;