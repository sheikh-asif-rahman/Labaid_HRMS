const { sql } = require("../config/dbConfig");

const designationUpdate = async (req, res) => {
    const { Id, DesignationName, DepartmentId, BranchId, Status, UpdatedBy } = req.body;

    if (!Id || !DesignationName || !DepartmentId || !BranchId || !UpdatedBy) {
        return res.status(400).json({ message: "Id, DesignationName, DepartmentId, BranchId, and UpdatedBy are required" });
    }

    if (Status !== 0 && Status !== 1) {
        return res.status(400).json({ message: "Status must be either 0 (Inactive) or 1 (Active)" });
    }

    try {
        const pool = await sql.connect();
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        // Check if the designation exists
        const checkQuery = `SELECT * FROM dbo.Designation WHERE Id = @Id`;
        const checkRequest = new sql.Request(transaction);
        checkRequest.input("Id", sql.Int, Id);

        const checkResult = await checkRequest.query(checkQuery);
        if (checkResult.recordset.length === 0) {
            await transaction.rollback();
            return res.status(404).json({ message: "Designation not found" });
        }

        // Check for duplicate designation in the same department & branch
        const duplicateQuery = `
            SELECT COUNT(*) AS count 
            FROM dbo.Designation 
            WHERE DesignationName = @DesignationName 
            AND DepartmentId = @DepartmentId 
            AND BranchId = @BranchId 
            AND Id != @Id
        `;
        const duplicateRequest = new sql.Request(transaction);
        duplicateRequest.input("DesignationName", sql.NVarChar, DesignationName);
        duplicateRequest.input("DepartmentId", sql.NVarChar, DepartmentId);
        duplicateRequest.input("BranchId", sql.NVarChar, BranchId);
        duplicateRequest.input("Id", sql.Int, Id);

        const duplicateResult = await duplicateRequest.query(duplicateQuery);
        if (duplicateResult.recordset[0].count > 0) {
            await transaction.rollback();
            return res.status(400).json({ message: "Designation with the same name already exists in this department and branch" });
        }

        // Proceed with the update
        const updateQuery = `
            UPDATE dbo.Designation 
            SET DesignationName = @DesignationName,
                DepartmentId = @DepartmentId,
                BranchId = @BranchId,
                Status = @Status,
                UpdatedBy = @UpdatedBy,
                UpdatedDate = GETDATE()
            WHERE Id = @Id
        `;
        const updateRequest = new sql.Request(transaction);
        updateRequest.input("DesignationName", sql.NVarChar, DesignationName);
        updateRequest.input("DepartmentId", sql.NVarChar, DepartmentId);
        updateRequest.input("BranchId", sql.NVarChar, BranchId);
        updateRequest.input("Status", sql.Bit, Status);
        updateRequest.input("UpdatedBy", sql.NVarChar, UpdatedBy);
        updateRequest.input("Id", sql.Int, Id);

        await updateRequest.query(updateQuery);
        await transaction.commit();

        res.status(200).json({ message: "Designation updated successfully" });
    } catch (err) {
        console.error("Error updating designation:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = { designationUpdate };
