const { sql } = require("../config/dbConfig");

// Fetch unique device names and IDs
const getLocations = async (req, res) => {
    try {
        // const query = `
        //     SELECT id, name 
        //     FROM dbo.usergroup AS ug 
        //     WHERE ug.parent_id IS NOT NULL 
        //     ORDER BY name ASC
        // `;
        const query = `
            select id,[name] from dbo.device
        `;
        const request = new sql.Request();
        const result = await request.query(query);
        res.json(result.recordset.map((item) => ({ id: item.id, name: item.name })));
    } catch (err) {
        console.error("Error fetching locations:", err);
        res.status(500).send("Error fetching locations");
    }
};

module.exports = { getLocations };
