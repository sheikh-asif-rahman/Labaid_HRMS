const { sql } = require("../config/dbConfig");

// Create a new department
const departmentCreate = async (req, res) => {
    try {
        const { DepartmentName, BranchId, Status, CreatedBy } = req.body;
        
        if (!DepartmentName || !BranchId || !CreatedBy) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const query = `
            INSERT INTO dbo.Department (DepartmentName, BranchId, Status, CreatedBy, CreatedDate)
            OUTPUT INSERTED.*
            VALUES (@DepartmentName, @BranchId, @Status, @CreatedBy, GETDATE())
        `;

        const request = new sql.Request();
        request.input("DepartmentName", sql.NVarChar, DepartmentName);
        request.input("BranchId", sql.NVarChar, BranchId);
        request.input("Status", sql.Bit, Status ?? 1);
        request.input("CreatedBy", sql.NVarChar, CreatedBy);
        
        const result = await request.query(query);
        res.status(201).json({ message: "Department created successfully", department: result.recordset[0] });
    } catch (err) {
        console.error("Error creating department:", err);
        res.status(500).json({ message: "Error creating department" });
    }
};

module.exports = { departmentCreate };
