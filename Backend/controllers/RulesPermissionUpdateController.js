const { sql } = require("../config/dbConfig");

const rulesPermissionEmployeeUpdate = async (req, res) => {
    try {
        let { userId, userName, permissions, branchId, branchName, updatedBy } = req.body;

        if (!userId || !userName || !permissions || !updatedBy) {
            return res.status(400).send("Fields userId, userName, permissions, and updatedBy are required.");
        }

        if (!Array.isArray(permissions)) {
            return res.status(400).send("permissions should be an array");
        }

        userId = userId.trim();
        console.log(`🔍 Searching for userId: ${userId}`);

        const request = new sql.Request();
        request.input("userId", sql.NVarChar, userId);
        request.input("userName", sql.NVarChar, userName);
        request.input("updatedBy", sql.NVarChar, updatedBy);

        // Check if user exists
        const userQuery = `SELECT UserId FROM dbo.UserLogin WHERE UserId = @userId`;
        const userResult = await request.query(userQuery);

        if (userResult.recordset.length === 0) {
            console.log("❌ No record found for userId:", userId);
            return res.status(404).send("No record found.");
        }

        // Step 1: Remove existing permissions
        const deletePermissionsQuery = `UPDATE dbo.UserLogin SET Permission = '' WHERE UserId = @userId`;
        await request.query(deletePermissionsQuery);
        console.log("🗑️ Existing permissions cleared.");

        // Step 2: Insert new permissions
        const newPermissions = permissions.join(",");
        const updatePermissionsQuery = `UPDATE dbo.UserLogin SET Permission = @permissions WHERE UserId = @userId`;
        request.input("permissions", sql.NVarChar, newPermissions);
        await request.query(updatePermissionsQuery);
        console.log("✅ New permissions updated.");

        // Step 3: Update BranchId and BranchName (clear if no data)
        const newBranchId = Array.isArray(branchId) && branchId.length > 0 ? branchId.join(",") : "";
        const newBranchName = Array.isArray(branchName) && branchName.length > 0 ? branchName.join(",") : "";

        const updateBranchQuery = `
            UPDATE dbo.UserLogin 
            SET BranchId = @branchId, 
                BranchName = @branchName, 
                UpdatedBy = @updatedBy
            WHERE UserId = @userId
        `;
        request.input("branchId", sql.NVarChar, newBranchId);
        request.input("branchName", sql.NVarChar, newBranchName);
        await request.query(updateBranchQuery);
        console.log("✅ BranchId and BranchName updated.");

        // Step 4: Update UserName
        const updateUserQuery = `
            UPDATE dbo.UserLogin
            SET UserName = @userName, 
                UpdatedBy = @updatedBy
            WHERE UserId = @userId
        `;
        await request.query(updateUserQuery);
        console.log("✅ User details updated successfully.");

        return res.send("User data updated successfully.");
    } catch (err) {
        console.error("🔥 Error updating user:", err);
        res.status(500).send("Error updating user");
    }
};

module.exports = { rulesPermissionEmployeeUpdate };
