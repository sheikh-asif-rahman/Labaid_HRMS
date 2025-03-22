const { sql } = require("../config/dbConfig");

// Fetch notifications and update Readed status only for a specific notification when requested
const getNotification = async (req, res) => {
    try {
        const { userId, notificationId, markRead } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "UserId is required" });
        }

        const pool = await sql.connect();

        if (markRead === "true" && notificationId) {
            // Update only the specific notification's Readed status to true
            await pool.request()
                .input("NotificationId", sql.Int, notificationId)  // Update based on Id
                .input("Readed", sql.Bit, 1)
                .query(`UPDATE [dbo].[Notifications] 
                        SET Readed = @Readed 
                        WHERE Id = @NotificationId`);
        }

        // Fetch updated notifications for the user
        const request = pool.request();
        request.input("CreatedBy", sql.NVarChar, userId);

        const query = `SELECT Id, EmployeeId, Remark, RejectedBy, CreatedBy, CAST(Readed AS BIT) AS Readed 
                       FROM [dbo].[Notifications] 
                       WHERE CreatedBy = @CreatedBy`;

        const result = await request.query(query);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Error fetching/updating notifications:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getNotification };
