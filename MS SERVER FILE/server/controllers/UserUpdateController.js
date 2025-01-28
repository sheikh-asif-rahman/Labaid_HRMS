const { sql } = require('../config/dbConfig');
const crypto = require('crypto'); // Use crypto for password hashing

// Hash a password using crypto
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

// Update user data based on UserId
const updateUser = async (req, res) => {
    const {
        userId,
        userName,
        mobileNo,
        branchId,
        branchName,
        permission,
        status,
        password,
        updatedBy,
    } = req.body;

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

        if (branchId || branchName) {
            if (branchId) {
                updateFields.push("BranchId = @BranchId");
                parameters.push({ name: "BranchId", value: branchId });
            }
            if (branchName) {
                updateFields.push("BranchName = @BranchName");
                parameters.push({ name: "BranchName", value: branchName });
            }
        }

        if (permission) {
            updateFields.push("Permission = @Permission");
            parameters.push({ name: "Permission", value: permission });
        }

        // Handle Status (1 for Active, 0 for Inactive)
        // Handle Status (1 for Active, 0 for Inactive)
        console.log("Status:", status);  // Log the status before checking

        if (status !== undefined) {
            let statusValue;

            // Check if the status is 'Active' or 'Inactive'
            if (status == 0) {
                statusValue = 0; // Set to Active (1)
            } else if (status == 1) {
                statusValue = 1; // Set to Inactive (0)
            }

            updateFields.push("Status = @Status");
            parameters.push({ name: "Status", value: statusValue });
        }


        if (updatedBy) {
            updateFields.push("UpdatedBy = @UpdatedBy");
            parameters.push({ name: "UpdatedBy", value: updatedBy });
        }

        // Handle Password (if provided)
        if (password) {
            const hashedPassword = hashPassword(password); // Hash the password using crypto
            updateFields.push("Password = @Password");
            parameters.push({ name: "Password", value: hashedPassword });
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

        // Log the final update query and parameters for debugging
        console.log("Update Query:", updateQuery);
        console.log("Parameters:", parameters);

        // Prepare SQL request for update
        const updateRequest = new sql.Request();
        updateRequest.input('UserId', sql.VarChar, userId);

        // Add parameters dynamically based on provided fields
        parameters.forEach(param => {
            if (param.name === "Status") {
                updateRequest.input(param.name, sql.Bit, param.value); // Ensure status is passed as Bit
            } else {
                updateRequest.input(param.name, sql.NVarChar, param.value); // Default to NVarChar
            }
        });

        // Execute the update query
        const updateResult = await updateRequest.query(updateQuery);

        // Check if the row was updated
        if (updateResult.rowsAffected[0] > 0) {
            return res.status(200).send("User updated successfully");
        } else {
            return res.status(404).send("User not found or no changes were made");
        }
    } catch (err) {
        // Log the error and return a generic message
        console.error("Error updating user:", err);
        res.status(500).send("Error updating user");
    }
};

module.exports = { updateUser };
