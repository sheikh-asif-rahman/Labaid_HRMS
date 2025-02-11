const { sql } = require("../config/dbConfig");

// Fetch BranchId and BranchName based on UserId
const getReportLocation = async (req, res) => {
    try {
        let { UserId } = req.query; // Get UserId from query parameters

        // If UserId is not provided, return an error
        if (!UserId) {
            return res.status(400).send("UserId is required");
        }

        // Trim the UserId to remove any leading/trailing spaces
        UserId = UserId.trim();

        // SQL query to fetch BranchId and BranchName for the given UserId
        const query = `
            SELECT BranchId, BranchName
            FROM dbo.UserLogin
            WHERE LTRIM(RTRIM(UserId)) = @UserId
        `;
  
        // Create a new SQL request
        const request = new sql.Request();

        // Bind the UserId as a parameter to prevent SQL injection
        request.input("UserId", sql.NVarChar, UserId);

        // Execute the query
        const result = await request.query(query);

        // If no result is found, return a 404 response
        if (result.recordset.length === 0) {
            return res.status(404).send("No branch found for the provided UserId.");
        }

        // Send the result back as a JSON response
        res.json(result.recordset.map((item) => ({
            BranchId: item.BranchId,
            BranchName: item.BranchName,
        })));
    } catch (err) {
        console.error("Error fetching branches:", err);
        res.status(500).send("Error fetching branches");
    }
};

module.exports = { getReportLocation };
