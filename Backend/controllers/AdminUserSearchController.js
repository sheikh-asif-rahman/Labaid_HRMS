const { sql } = require("../config/dbConfig");

// Fetch a user based on UserId passed in the request body
const doUser = async (req, res) => {
    try {
        const { UserId } = req.body;  // Retrieve UserId from request body

        // Query to match the UserId in the dbo.UserLogin table
        const query = `
            SELECT * FROM dbo.UserLogin WHERE UserId = @UserId
        `;

        const request = new sql.Request();
        request.input("UserId", sql.VarChar, UserId); // Use UserId as input for the query

        // Execute the query
        const result = await request.query(query);

        if (result.recordset.length > 0) {
            // Return the first matched user row
            res.json(result.recordset[0]);
        } else {
            // If no user is found, return a message
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).send("Error fetching user data");
    }
};

module.exports = { doUser };
