const { sql } = require("../config/dbConfig");

const searchEmployee = async (req, res) => {
    try {
        let { EmployeeId } = req.query;

        if (!EmployeeId) {
            return res.status(400).send("EmployeeId is required");
        }

        EmployeeId = EmployeeId.trim();
        console.log(`🔍 Searching for EmployeeId: ${EmployeeId}`);

        // Query to fetch employee details
        const employeeQuery = `
            SELECT 
                EmployeeName, EmployeeId, DepartmentId, DesignationId, BranchId, 
                DateOfJoin, DateOfResign, PersonalContactNumber, OfficalContactNumber, 
                Email, EmployeeType, Gender, MaritalStatus, BloodGroup, 
                FatherName, MotherName, PresentAddress, PermanentAddress, Password
            FROM dbo.Employee 
            WHERE LTRIM(RTRIM(EmployeeId)) = @EmployeeId
        `;

        const request = new sql.Request();
        request.input("EmployeeId", sql.NVarChar, EmployeeId);
        const employeeResult = await request.query(employeeQuery);

        if (employeeResult.recordset.length === 0) {
            console.log("❌ No employee found for EmployeeId:", EmployeeId);
            return res.status(404).send("No employee found.");
        }

        console.log(`✅ Employee found:`, employeeResult.recordset[0]);
        return res.json(employeeResult.recordset[0]);
    } catch (err) {
        console.error("🔥 Error searching employee:", err);
        res.status(500).send("Error searching employee");
    }
};

module.exports = { searchEmployee };