const { sql } = require("../config/dbConfig");

const employeeCreate = async (req, res) => {
    try {
        let { userId } = req.query;

        if (!userId) {
            return res.status(400).send("userId is required");
        }

        userId = userId.trim();
        console.log(`🔍 Searching for userId: ${userId}`);

        const request = new sql.Request();
        request.input("userId", sql.NVarChar, userId);

        // First, search in Employee table
        const employeeQuery = `
            SELECT 
                EmployeeName, EmployeeId, DepartmentId, DesignationId, BranchId, 
                DateOfJoin, DateOfResign, NID, PersonalContactNumber, OfficalContactNumber, 
                Email, EmployeeType, Gender, MaritalStatus, BloodGroup, 
                FatherName, MotherName, PresentAddress, PermanentAddress, Password, 
                Image, Status
            FROM dbo.Employee 
            WHERE LTRIM(RTRIM(EmployeeId)) = @userId
        `;

        const employeeResult = await request.query(employeeQuery);

        if (employeeResult.recordset.length > 0) {
            console.log(`✅ Employee found:`, employeeResult.recordset[0]);
            return res.json(employeeResult.recordset[0]);
        }

        console.log("🔄 EmployeeId not found, searching in punchlog...");

        // Search in punchlog table
        const punchlogQuery = `
            SELECT user_id, user_name 
            FROM dbo.punchlog 
            WHERE LTRIM(RTRIM(user_id)) = @userId
        `;

        const punchlogResult = await request.query(punchlogQuery);

        if (punchlogResult.recordset.length > 0) {
            console.log(`✅ Found in punchlog:`, punchlogResult.recordset[0]);
            return res.json(punchlogResult.recordset[0]);
        }

        console.log("❌ No record found for userId:", userId);
        return res.status(404).send("No record found.");
    } catch (err) {
        console.error("🔥 Error searching user:", err);
        res.status(500).send("Error searching user");
    }
};

module.exports = { employeeCreate };
