const { sql } = require("../config/dbConfig");

// Fetch EmployeeId, Remark, RejectedBy, CreatedBy based on userId matching CreatedBy
const getNotification = async (req, res) => {
    try {
        const { userId } = req.query; // Extract userId from query parameters

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const pool = await sql.connect();
        const result = await pool.request()
            .input("CreatedBy", sql.Int, userId)
            .query(`SELECT EmployeeId, Remark, RejectedBy, CreatedBy FROM [dbo].[Notifications] WHERE CreatedBy = @CreatedBy`);

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getNotification };
