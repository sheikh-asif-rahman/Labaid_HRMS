const { sql } = require("../config/dbConfig");

const designationCreate = async (req, res) => {
    try {
        const designations = req.body; // Expecting an array of designations

        if (!Array.isArray(designations) || designations.length === 0) {
            return res.status(400).json({ message: "Invalid input. Expected an array of designations." });
        }

        const pool = await sql.connect(); // Connect to DB
        const transaction = new sql.Transaction(pool);

        await transaction.begin(); // Start transaction

        for (const designation of designations) {
            const { DesignationName, DepartmentId, BranchId, Status, CreatedBy } = designation;

            if (!DesignationName || !DepartmentId || !BranchId || !CreatedBy) {
                await transaction.rollback();
                return res.status(400).json({ message: "Missing required fields in one or more records" });
            }

            // Check if the designation already exists
            const checkQuery = `
                SELECT COUNT(*) AS count
                FROM dbo.Designation
                WHERE DesignationName = @DesignationName AND DepartmentId = @DepartmentId AND BranchId = @BranchId
            `;
            const checkRequest = new sql.Request(transaction);
            checkRequest.input("DesignationName", sql.NVarChar, DesignationName);
            checkRequest.input("DepartmentId", sql.NVarChar, DepartmentId);
            checkRequest.input("BranchId", sql.NVarChar, BranchId);

            const checkResult = await checkRequest.query(checkQuery);

            if (checkResult.recordset[0].count > 0) {
                await transaction.rollback();
                return res.status(400).json({
                    message: `Designation '${DesignationName}' already exists under the same department and branch.`,
                });
            }

            // Insert the new designation
            const insertQuery = `
                INSERT INTO dbo.Designation (DesignationName, DepartmentId, BranchId, Status, CreatedBy, CreatedDate)
                OUTPUT INSERTED.*
                VALUES (@DesignationName, @DepartmentId, @BranchId, @Status, @CreatedBy, GETDATE())
            `;

            const insertRequest = new sql.Request(transaction);
            insertRequest.input("DesignationName", sql.NVarChar, DesignationName);
            insertRequest.input("DepartmentId", sql.NVarChar, DepartmentId);
            insertRequest.input("BranchId", sql.NVarChar, BranchId);
            insertRequest.input("Status", sql.Bit, Status ?? 1);
            insertRequest.input("CreatedBy", sql.NVarChar, CreatedBy);

            await insertRequest.query(insertQuery);
        }

        await transaction.commit(); // Commit transaction after all inserts

        res.status(201).json({ message: "Designations created successfully" });
    } catch (err) {
        console.error("Error creating designations:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = { designationCreate };
