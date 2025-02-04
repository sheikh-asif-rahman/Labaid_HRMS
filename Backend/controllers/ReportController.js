const { sql } = require('../config/dbConfig');

// Fetch data based on branch ID, user ID, and date range
const getReportData = async (req, res) => {
    const { branchId, userId, fromDate, toDate } = req.body; // Use req.body for POST method

    // Input validation
    if (!branchId || !fromDate || !toDate) {
        return res.status(400).json({
            message: "All parameters (branchId, fromDate, toDate) are required. User ID is optional.",
        });
    }

    try {
        // Base query
        let query = `
            SELECT devdt, user_id, devnm
            FROM dbo.punchlog
            WHERE devid = @branchId
            AND CAST(devdt AS DATE) BETWEEN CAST(@fromDate AS DATE) AND CAST(@toDate AS DATE)
        `;

        // Add user_id condition if provided
        if (userId) {
            query += ` AND user_id = @userId`;
        }

        const request = new sql.Request();
        request.input('branchId', sql.NVarChar, branchId);
        request.input('fromDate', sql.Date, fromDate);
        request.input('toDate', sql.Date, toDate);

        if (userId) {
            request.input('userId', sql.NVarChar, userId);
        }

        const result = await request.query(query);

        // Check if data is found
        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "No data found for the given criteria",
            });
        }

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error("Error fetching report data:", err);

        // Differentiating errors
        if (err.code === 'ETIMEOUT') {
            return res.status(503).json({
                message: "Database connection timeout, please try again later",
            });
        }

        res.status(500).json({
            message: "An unexpected error occurred while fetching report data",
            error: err.message,
        });
    }
};

module.exports = { getReportData };
