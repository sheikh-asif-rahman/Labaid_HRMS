const { sql } = require("../config/dbConfig");

// Fetch all designations
const loadDesignation = async (req, res) => {
    try {
        const query = `
            SELECT Id, DesignationName, DepartmentId, BranchId, Status FROM dbo.Designation
        `;
        const request = new sql.Request();
        const result = await request.query(query);
        res.json(result.recordset.map((item) => ({ 
            id: item.Id,
            designationName: item.DesignationName,
            departmentId: item.DepartmentId,
            branchId: item.BranchId,
            status: item.Status
        })));
    } catch (err) {
        console.error("Error fetching designations:", err);
        res.status(500).send("Error fetching designations");
    }
};

module.exports = { loadDesignation };
