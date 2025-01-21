const { sql } = require('../config/dbConfig');

// Update user data based on UserId
const updateUser = async (req, res) => {
    const { userId, userName, mobileNo, branchId, permission, password, status, updatedBy } = req.body;

    // Validate incoming data
    if (!userId) {
        return res.status(400).send("UserId is required");
    }

    try {
        // Check if the UserId exists in the database
        const checkQuery = `
            SELECT COUNT(*) AS userCount
            FROM dbo.UserLogin
            WHERE UserId = @UserId
        `;
        const request = new sql.Request();
        request.input('UserId', sql.VarChar, userId);

        const result = await request.query(checkQuery);

        // If the UserId doesn't exist, send an error message
        if (result.recordset[0].userCount === 0) {
            return res.status(404).send("UserId does not exist in the database");
        }

        // Start building the UPDATE query
        let updateFields = [];
        let parameters = [];

        // Conditionally add fields to the update query if they are provided
        if (userName) {
            updateFields.push("UserName = @UserName");
            parameters.push({ name: "UserName", value: userName });
        }

        if (mobileNo) {
            updateFields.push("MobileNo = @MobileNo");
            parameters.push({ name: "MobileNo", value: mobileNo });
        }

        if (branchId) {
            updateFields.push("BranchId = @BranchId");
            parameters.push({ name: "BranchId", value: branchId });
        }

        if (permission) {
            updateFields.push("Permission = @Permission");
            parameters.push({ name: "Permission", value: permission });
        }

        if (password) {
            updateFields.push("Password = @Password");
            parameters.push({ name: "Password", value: password });
        }

        // Handle Status (1 for Active, 0 for Inactive)
        if (status !== undefined) {
            // Convert the status to 1 for Active or 0 for Inactive
            const statusValue = status === "Active" ? 1 : (status === "Inactive" ? 0 : null);

            if (statusValue === null) {
                return res.status(400).send("Invalid status value. Must be 'Active' or 'Inactive'.");
            }

            updateFields.push("Status = @Status");
            parameters.push({ name: "Status", value: statusValue });
        }

        if (updatedBy) {
            updateFields.push("UpdatedBy = @UpdatedBy");
            parameters.push({ name: "UpdatedBy", value: updatedBy });
        }

        // If no fields to update, return an error
        if (updateFields.length === 0) {
            return res.status(400).send("No fields to update");
        }

        // Build the final query string
        const updateQuery = `
            UPDATE dbo.UserLogin
            SET ${updateFields.join(', ')}
            WHERE UserId = @UserId
        `;

        // Prepare SQL request for update
        const updateRequest = new sql.Request();
        updateRequest.input('UserId', sql.VarChar, userId);

        // Add parameters dynamically based on provided fields
        parameters.forEach(param => {
            if (param.name === "Status") {
                updateRequest.input(param.name, sql.Bit, param.value);  // Ensure status is passed as Bit
            } else {
                updateRequest.input(param.name, sql.VarChar, param.value);  // Default to VarChar
            }
        });

        // Execute the update query
        const updateResult = await updateRequest.query(updateQuery);

        // Check if the row was updated
        if (updateResult.rowsAffected[0] > 0) {
            return res.status(200).send("User updated successfully");
        } else {
            return res.status(404).send("User not found");
        }
    } catch (err) {
        // Log the error and return a generic message
        console.error("Error updating user:", err); // Log the full error for debugging
        res.status(500).send("Error updating user");
    }
};

module.exports = { updateUser };
