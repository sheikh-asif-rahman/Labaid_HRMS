const { sql } = require("../config/dbConfig");

// Fetch all branch names and statuses
const loadDepartments = async (req, res) => {
    try {
        const query = `
            SELECT Id, DepartmentName, Status, BranchId FROM dbo.Department
        `;
        const request = new sql.Request();
        const result = await request.query(query);
        res.json(result.recordset.map((item) => ({ 
            id:item.Id,
            departmentName: item.DepartmentName, 
            status: item.Status,
            branchid: item.BranchId 
        })));
    } catch (err) {
        console.error("Error fetching departments:", err);
        res.status(500).send("Error fetching departments");
    }
};

module.exports = { loadDepartments };
