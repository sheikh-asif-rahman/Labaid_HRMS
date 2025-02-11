const { sql } = require("../config/dbConfig");

const getdepartmentlist = async (req, res) => {
    try {
        console.log("🔍 Fetching department list");

        // Query to fetch department details
        const departmentQuery = `
            SELECT Id, DepartmentName FROM dbo.Department
        `;

        const request = new sql.Request();
        const departmentResult = await request.query(departmentQuery);

        if (departmentResult.recordset.length === 0) {
            console.log("❌ No departments found");
            return res.status(404).send("No departments found.");
        }

        console.log("✅ Departments fetched successfully");
        return res.json(departmentResult.recordset);
    } catch (err) {
        console.error("🔥 Error fetching departments:", err);
        res.status(500).send("Error fetching departments");
    }
};

module.exports = { getdepartmentlist };
