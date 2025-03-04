import React from 'react';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Footer from '../Components/Footer/Footer';
import LeaveManagement from '../Components/LeaveManagement/LeaveManagement';
// import LeaveForm from '../Components/LeaveForm/LeaveForm';

const LeaveManagementPage = () => {
    // const employee = {
    //     empCode: 'E123',
    //     empName: 'John Doe',
    //     designation: 'Software Engineer',
    //     department: 'IT',
    //     joiningDate: '2023-05-12',
    // };

    // const leaveData = {
    //     leaveEnjoyedDays: 5,
    //     leaveBalanceDays: 15,
    //     leaveRequiredDays: 5,
    //     leaveStartDate: "2025-03-10",
    //     leaveEndDate: "2025-03-15",
    //     purposeOfLeave: "Personal reasons",
    //     chargePerson: "Jane Smith"
    // };

    return (
        <div>
            <NavigationBar />
            <LeaveManagement />
            {/* <LeaveForm employee={employee} leaveData={leaveData} /> */}
            <Footer />
        </div>
    );
};

export default LeaveManagementPage;
