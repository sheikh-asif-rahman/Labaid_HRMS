const { sql } = require('../config/dbConfig');

// Fetch unique device names
const getLocations = async (req, res) => {
    try {
        const query = `
            SELECT DISTINCT name 
            FROM dbo.device
            ORDER BY name
        `;
        const request = new sql.Request();
        const result = await request.query(query);
        res.json(result.recordset.map(item => item.name));
    } catch (err) {
        console.error("Error fetching locations:", err);
        res.status(500).send("Error fetching locations");
    }
};

module.exports = { getLocations };
