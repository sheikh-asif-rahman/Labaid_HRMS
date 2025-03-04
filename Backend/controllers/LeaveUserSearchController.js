const { sql } = require("../config/dbConfig");

// Fetch user details and leave records
const leaveUserSearch = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const request = new sql.Request();
        request.input("user_id", sql.Int, user_id);

        // Query Employee table
        const employeeQuery = `
            SELECT EmployeeName, EmployeeId, DepartmentId, DesignationId 
            FROM dbo.Employee 
            WHERE EmployeeId = @user_id
        `;
        const employeeResult = await request.query(employeeQuery);

        if (employeeResult.recordset.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const employeeData = employeeResult.recordset[0];

        // Query Leave table
        const leaveQuery = `
            SELECT employee_id, employee_name, request_reason, start_date, end_date, 
                   department_name, designation_name, alternative_person, leave_enjoyed, 
                   leave_balance, created_by, created_date 
            FROM dbo.Leave 
            WHERE employee_id = @user_id
        `;
        const leaveResult = await request.query(leaveQuery);
        const leaveData = leaveResult.recordset;

        return res.json({ employee: employeeData, leave: leaveData });
    } catch (error) {
        console.error("Error fetching leave user search:", error);
        return res.status(500).send("Error fetching leave user search");
    }
};

module.exports = { leaveUserSearch };
