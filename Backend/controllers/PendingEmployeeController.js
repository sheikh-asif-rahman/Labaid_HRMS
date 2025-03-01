const { sql } = require("../config/dbConfig");

// Fetch employees with status 'lock'
const getPendingEmployee = async (req, res) => {
    try {
        // SQL query to fetch all employee details where Status is 'lock'
        const query = `
            SELECT EmployeeName, EmployeeId, DepartmentId, DesignationId, BranchId, DateOfJoin, Status, CreatedBy
            FROM dbo.Employee
            WHERE LTRIM(RTRIM(Status)) = 'lock'
        `;

        // Create a new SQL request
        const request = new sql.Request();

        // Execute the query
        const result = await request.query(query);

        // If no result is found, return a 404 response
        if (result.recordset.length === 0) {
            return res.status(404).send("No locked employees found.");
        }

        // Send the result back as a JSON response
        res.json(result.recordset);
    } catch (err) {
        console.error("Error fetching locked employees:", err);
        res.status(500).send("Error fetching locked employees");
    }
};

module.exports = { getPendingEmployee };
