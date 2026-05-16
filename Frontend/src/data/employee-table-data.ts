export type Employee = {
  id: string;
  name: string;
  designation: string;
  department: string;
  facility: string;
  status: "Active" | "On Leave" | "Absent";
  image: string;
};

export const employeeTableData: Employee[] = [
  {
    id: "#EMP-1024",
    name: "John Carter",
    designation: "UI/UX Designer",
    department: "Design",
    facility: "Dhaka HQ",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "#EMP-1025",
    name: "Sarah Wilson",
    designation: "Frontend Developer",
    department: "Engineering",
    facility: "Remote",
    status: "On Leave",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "#EMP-1026",
    name: "Michael Lee",
    designation: "HR Manager",
    department: "HR",
    facility: "Dhaka HQ",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: "#EMP-1027",
    name: "Emily Brown",
    designation: "Backend Engineer",
    department: "Engineering",
    facility: "Chittagong",
    status: "Absent",
    image: "https://i.pravatar.cc/150?img=20",
  },
];