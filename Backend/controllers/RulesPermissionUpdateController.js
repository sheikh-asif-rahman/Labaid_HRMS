const { sql } = require("../config/dbConfig");

const rulesPermissionEmployeeUpdate = async (req, res) => {
    try {
        let { userId, userName, permissions, branchId, branchName, updatedBy } = req.body;

        if (!userId || !userName || !permissions || !branchId || !branchName || !updatedBy) {
            return res.status(400).send("All fields (userId, userName, permissions, branchId, branchName, updatedBy) are required");
        }

        if (!Array.isArray(permissions) || !Array.isArray(branchId) || !Array.isArray(branchName)) {
            return res.status(400).send("permissions, branchId, and branchName should be arrays");
        }

        userId = userId.trim();
        console.log(`🔍 Searching for userId: ${userId}`);

        const request = new sql.Request();
        request.input("userId", sql.NVarChar, userId);
        request.input("userName", sql.NVarChar, userName);
        request.input("permissions", sql.NVarChar, permissions.join(","));
        request.input("branchId", sql.NVarChar, branchId.join(","));
        request.input("branchName", sql.NVarChar, branchName.join(",")); // Added branchName
        request.input("updatedBy", sql.NVarChar, updatedBy);

        // Check if user exists
        const userQuery = `SELECT UserId FROM dbo.UserLogin WHERE UserId = @userId`;
        const userResult = await request.query(userQuery);

        if (userResult.recordset.length === 0) {
            console.log("❌ No record found for userId:", userId);
            return res.status(404).send("No record found.");
        }

        // Update the user data, adding BranchName
        const updateQuery = `
            UPDATE dbo.UserLogin
            SET UserName = @userName, 
                Permission = @permissions, 
                BranchId = @branchId, 
                BranchName = @branchName,  -- Added branchName
                UpdatedBy = @updatedBy
            WHERE UserId = @userId
        `;

        await request.query(updateQuery);

        console.log("✅ User data updated successfully.");
        return res.send("User data updated successfully.");
    } catch (err) {
        console.error("🔥 Error updating user:", err);
        res.status(500).send("Error updating user");
    }
};

module.exports = { rulesPermissionEmployeeUpdate };
