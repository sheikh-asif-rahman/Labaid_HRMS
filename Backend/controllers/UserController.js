const { sql } = require('../config/dbConfig');

// Fetch user_ids based on the given ugid
const getUsers = async (req, res) => {
    const ugid = req.query.ugid;  // Get ugid from the request query parameter

    if (!ugid) {
        return res.status(400).send("ugid parameter is required");
    }

    try {
        const query = `
            SELECT u.user_id 
            FROM dbo.[user] AS u
            JOIN dbo.uguser AS uu ON u.user_id = uu.user_id
            JOIN dbo.usergroup AS ug ON uu.ugid = ug.id
            WHERE uu.ugid = @ugid
        `;

        const request = new sql.Request();
        request.input('ugid', sql.Int, ugid);  // Use parameterized query to prevent SQL injection

        const result = await request.query(query);
        res.json(result.recordset.map(item => item.user_id));  // Return only user_id in the response
    } catch (err) {
        console.error("Error fetching user_ids:", err);
        res.status(500).send("Error fetching user_ids");
    }
};

module.exports = { getUsers };
