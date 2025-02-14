const { sql } = require('../config/dbConfig');

// Update department data based on Id
const departmentUpdate = async (req, res) => {
    const {
        Id, // The department Id to update
        DepartmentName,
        BranchId,
        Status,
        UpdatedBy,
    } = req.body;

    // Validate incoming data
    if (!Id) {
        return res.status(400).send("Id is required");
    }

    // Validate Status - it must be either 0 or 1
    if (Status !== 0 && Status !== 1) {
        return res.status(400).send("Status must be either 0 (Inactive) or 1 (Active)");
    }

    try {
        // Check if the Id exists in the database
        const checkQuery = `
            SELECT DepartmentName, BranchId
            FROM dbo.Department
            WHERE Id = @Id
        `;
        const request = new sql.Request();
        request.input('Id', sql.Int, Id);

        const result = await request.query(checkQuery);

        // If the Id doesn't exist, send an error message
        if (result.recordset.length === 0) {
            return res.status(404).send("Department with the given Id does not exist in the database");
        }

        // Check if the same DepartmentName exists for the same BranchId
        const checkDuplicateQuery = `
            SELECT COUNT(*) AS duplicateCount
            FROM dbo.Department
            WHERE DepartmentName = @DepartmentName
            AND BranchId = @BranchId
            AND Id != @Id
        `;
        request.input('DepartmentName', sql.NVarChar, DepartmentName);
        request.input('BranchId', sql.Int, BranchId);

        const duplicateResult = await request.query(checkDuplicateQuery);

        // If duplicate department name exists for the same branch, send an error message
        if (duplicateResult.recordset[0].duplicateCount > 0) {
            return res.status(400).send("Department with the same name already exists in this branch");
        }

        // Start building the UPDATE query
        let updateFields = [];
        let parameters = [];

        // Conditionally add fields to the update query if they are provided
        if (DepartmentName) {
            updateFields.push("DepartmentName = @DepartmentName");
            parameters.push({ name: "DepartmentName", value: DepartmentName });
        }

        if (BranchId) {
            updateFields.push("BranchId = @BranchId");
            parameters.push({ name: "BranchId", value: BranchId });
        }

        if (Status !== undefined) {
            updateFields.push("Status = @Status");
            // Explicitly set the type as BIT (0 or 1)
            parameters.push({ name: "Status", value: Status === 1 ? 1 : 0, type: sql.Bit });
        }

        if (UpdatedBy) {
            updateFields.push("UpdatedBy = @UpdatedBy");
            parameters.push({ name: "UpdatedBy", value: UpdatedBy });
        }

        // Add UpdatedDate
        updateFields.push("UpdatedDate = GETDATE()");

        // If no fields to update, return an error
        if (updateFields.length === 0) {
            return res.status(400).send("No fields to update");
        }

        // Build the final query string
        const updateQuery = `
            UPDATE dbo.Department
            SET ${updateFields.join(', ')}
            WHERE Id = @Id
        `;

        // Prepare SQL request for update
        const updateRequest = new sql.Request();
        updateRequest.input('Id', sql.Int, Id);

        // Add parameters dynamically based on provided fields
        parameters.forEach(param => {
            updateRequest.input(param.name, param.type || sql.NVarChar, param.value); // Ensure type is set correctly
        });

        // Execute the update query
        const updateResult = await updateRequest.query(updateQuery);

        // Check if the row was updated
        if (updateResult.rowsAffected[0] > 0) {
            return res.status(200).send("Department updated successfully");
        } else {
            return res.status(404).send("Department not found or no changes were made");
        }
    } catch (err) {
        // Log the error and return a generic message
        console.error("Error updating department:", err);
        res.status(500).send("Error updating department");
    }
};

module.exports = { departmentUpdate };
