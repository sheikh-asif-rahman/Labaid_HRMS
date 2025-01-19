const { sql } = require("../config/dbConfig");

// Fetch unique device names
const getLocations = async (req, res) => {
    try {
        const query = `
            Select * from dbo.usergroup as ug where ug.parent_id is not null 
            order by name asc
        `;
        const request = new sql.Request();
        const result = await request.query(query);
        res.json(result.recordset.map((item) => item.name));
    } catch (err) {
        console.error("Error fetching locations:", err);
        res.status(500).send("Error fetching locations");
    }
};

module.exports = { getLocations };
