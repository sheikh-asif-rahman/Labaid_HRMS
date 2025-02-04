const { sql } = require("../config/dbConfig");

// Fetch user_id with present/absent status for today based on devid
const getOverViewOne = async (req, res) => {
    try {
        const { devid } = req.query;  // Get devid from query parameters
        const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format

        // If devid is not provided, return an error
        if (!devid) {
            return res.status(400).send("Device ID (devid) is required");
        }

        // SQL query to get distinct user_id and their status (Present/Absent)
        const query = `
            WITH UserList AS (
                SELECT DISTINCT user_id 
                FROM dbo.punchlog 
                WHERE devid = @devid
            )
            SELECT ul.user_id,
                   CASE 
                       WHEN EXISTS (
                           SELECT 1 
                           FROM dbo.punchlog p 
                           WHERE p.user_id = ul.user_id 
                           AND p.devid = @devid
                           AND CAST(p.devdt AS DATE) = @today
                       ) THEN 'Present'
                       ELSE 'Absent'
                   END AS status
            FROM UserList ul;
        `;

        const request = new sql.Request();

        // Bind parameters to the query
        request.input("devid", sql.Int, devid);  // Bind devid to prevent SQL injection
        request.input("today", sql.Date, today);  // Bind today's date for comparison

        // Execute the query
        const result = await request.query(query);

        // Send the result back as a JSON response
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error("Error fetching user statuses:", err);
        res.status(500).send("Error fetching user statuses");
    }
};

module.exports = { getOverViewOne };
