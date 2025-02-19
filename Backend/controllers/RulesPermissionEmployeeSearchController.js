const { sql } = require("../config/dbConfig");

const rulesPermissionEmployeeSearch = async (req, res) => {
    try {
        let { userId } = req.query;

        if (!userId) {
            return res.status(400).send("userId is required");
        }

        userId = userId.trim();
        console.log(`🔍 Searching for userId: ${userId}`);

        const request = new sql.Request();
        request.input("userId", sql.NVarChar, userId);

        // Search in UserLogin table
        const userLoginQuery = `
            SELECT 
                UserId, UserName, BranchId, Permission
            FROM dbo.UserLogin 
            WHERE UserId = @userId
        `;

        const userLoginResult = await request.query(userLoginQuery);

        if (userLoginResult.recordset.length > 0) {
            console.log(`✅ User found:`, userLoginResult.recordset[0]);
            return res.json(userLoginResult.recordset[0]);
        }

        console.log("❌ No record found for userId:", userId);
        return res.status(404).send("No record found.");
    } catch (err) {
        console.error("🔥 Error searching user:", err);
        res.status(500).send("Error searching user");
    }
};

module.exports = { rulesPermissionEmployeeSearch };